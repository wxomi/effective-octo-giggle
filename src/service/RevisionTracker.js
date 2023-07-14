const { CronJob } = require("cron");
const RevisionTracker = require("../models/RevisionTracker");
const mongoose = require("mongoose");
const RevisionQuestionsLog = require("../models/RevisionQuestionsLog");
const sender = require("../config/emailConfig");

// Path: src/routes/revisionTracker.js
//0 5 * * 1-5
//0 5 * * 6,0
//0 5 * * *

const insertRevisonsTrackers = async (req, res) => {
  try {
    const response = await RevisionTracker.insertMany(req.body, {
      ordered: false,
    });
    res.status(200).json({
      status: "success",
      data: {
        revisionTracker: response,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const createRevisionTracker = async ({ url, name }) => {
  try {
    const response = await RevisionTracker.create({ url, name });
    return response;
  } catch (error) {
    throw error;
  }
};

const getRevisionTracker = async () => {
  try {
    /*  {
      url: { $regex: "practice" },
    }*/
    // const today = new Date();
    // const daysSinceSunday = today.getDay();
    // const daysUntilPreviousSunday = daysSinceSunday === 0 ? 7 : daysSinceSunday;
    // const previousSunday = new Date(today);
    // previousSunday.setDate(today.getDate() - daysUntilPreviousSunday);

    // const response = await RevisionTracker.find({
    //   createdAt: { $gte: previousSunday },
    // })
    //   .sort({ updatedAt: 1 })
    //   .limit(5);
    // const response = await RevisionTracker.updateMany(
    //   {},
    //   { $rename: { revisonCount: "revisionCount" } }
    // );

    return response;
  } catch (error) {
    throw error;
  }
};

const weeklyJob = new CronJob("0 0 * * 1-5", async () => {
  console.log("cron job running weekly ", new Date().toLocaleString());
  const today = new Date();
  const daysSinceSunday = today.getDay();
  const daysUntilPreviousSunday = daysSinceSunday === 0 ? 7 : daysSinceSunday;
  const previousSunday = new Date(today);
  previousSunday.setDate(today.getDate() - daysUntilPreviousSunday);

  const response = await RevisionTracker.find({
    createdAt: { $gte: previousSunday },
  })
    .sort({ updatedAt: 1 })
    .limit(5);
  if (response.length === 0) {
    return;
  }
  console.log("Sending email");
  sender.sendMail(
    {
      to: "garyh0st@icloud.com",
      subject: "Weekly Revision Questions",
      html: `
      <html>
        <head>
          <style>
            h1 {
              color: red;
            }
            p {
              font-size: 18px;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              margin-bottom: 10px;
            }
            a {
              color: blue;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <h1>Weekly Revision Questions</h1>
          <p>Hi, here are your weekly revision questions</p>
          <ul>
            ${response.map(
              (item) =>
                `<li><a href=${item.url}>${item.name} - Revision Count- ${item.revisionCount}</a></li>`
            )}
          </ul>
        </body>
      </html>
    `,
    },
    async (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
        const ids = response.map((item) => item._id);
        //creating ids for today to check if the user has revised the question or not later that day

        try {
          await mongoose.connection.dropCollection("revisionquestionslogs");
          console.log("Dropped");
          const documents = ids.map((id) => ({ questionId: id }));

          const response = await RevisionQuestionsLog.insertMany(documents);
        } catch (error) {
          throw error;
        }
      }
    }
  );
});

const updateTodayQuestions = async (id) => {
  try {
    const response = await RevisionQuestionsLog.updateOne(
      { questionId: id },
      { isChecked: true }
    );
    const filter = { _id: { $in: id } };
    const update = {
      $inc: { revisionCount: 1 },
      $set: { updatedAt: new Date() },
    };

    await RevisionTracker.updateOne(filter, update);

    return response;
  } catch (error) {
    throw error;
  }
};
const getTodayQuestions = async () => {
  const res = await RevisionQuestionsLog.find();
  /*{
    createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
  }*/

  const ids = res.map((item) => item.questionId);

  let questions = await RevisionTracker.find({ _id: { $in: ids } });

  const updatedQuestions = questions.map((item) => {
    const index = res.findIndex(
      (i) => i.questionId.toString() === item._id.toString()
    );
    return { ...item.toObject(), isChecked: res[index].isChecked };
    //toObject() is used to convert mongoose object to plain js object
  });

  return updatedQuestions;
};

//cron accorind to utc time
const revisionJob = new CronJob("0 0 * * 6,0", async () => {
  console.log("cron job running revision ", new Date().toLocaleString());
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const response = await RevisionTracker.find().sort({ updatedAt: 1 }).limit(5);
  if (response.length === 0) {
    return;
  }
  sender.sendMail(
    {
      to: "sainianshul4987@gmail.com",
      subject: "Today Revision Questions",
      html: `
      <html>
        <head>
          <style>
            h1 {
              color: red;
            }
            p {
              font-size: 18px;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              margin-bottom: 10px;
            }
            a {
              color: blue;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <h1>Today's Revision Questions</h1>
          <p>Hi, here are your today's revision questions</p>
          <ul>
            ${response.map(
              (item) =>
                `<li><a href=${item.url}>${item.name} - Revision Count- ${item.revisionCount}</a></li>`
            )}
          </ul>
        </body>
      </html>
    `,
    },
    async (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
        const ids = response.map((item) => item._id);
        //creating ids for today to check if the user has revised the question or not later that day

        try {
          await mongoose.connection.dropCollection("revisionquestionslogs");
          console.log("Dropped");
          const documents = ids.map((id) => ({ questionId: id }));

          const response = await RevisionQuestionsLog.insertMany(documents);
        } catch (error) {
          throw error;
        }
      }
    }
  );
});

module.exports = {
  createRevisionTracker,
  getRevisionTracker,
  createRevisionTracker,
  getTodayQuestions,
  updateTodayQuestions,
  revisionJob,
  weeklyJob,
};
