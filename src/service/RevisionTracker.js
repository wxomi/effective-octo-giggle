const { CronJob } = require("cron");
const RevisionTracker = require("../models/RevisionTracker");
const IDs = require("../models/TodayIds");
const sender = require("../config/emailConfig");

// Path: src/routes/revisionTracker.js
//0 5 * * 1-5
//0 5 * * 6,0
//0 5 * * *

const createRevisionTracker = async (data) => {
  try {
    const response = await RevisionTracker.create(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const getRevisionTracker = async () => {
  try {
    const response = await RevisionTracker.find().sort({ revised: 1 }).limit(5);
    return response;
  } catch (error) {
    throw error;
  }
};

const getTodayQuestions = async (req, res) => {
  try {
    const response = await IDs.find().limit(1);
  } catch (error) {
    throw error;
  }
};
s;

const dailyTaskJob = new CronJob("0 5 * * *", async () => {
  console.log("running a task every minute");
  const response = await RevisionTracker.find().sort({ revised: 1 }).limit(5);
  sender.sendMail(
    {
      to: "a.n.a.ndaall.en370@gmail.com",
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
                `<li><a href=${item.url}>${item.name}</a>  ${item.revised} - Id- ${item._id}</li>`
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
        // await IDs.create({ ids });

        try {
          await RevisionTracker.updateMany(
            { _id: { $in: ids } },
            { $inc: { revised: 1 } }
            // { multi: true } //multi for multiple documents
          );
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
  dailyTaskJob,
};
