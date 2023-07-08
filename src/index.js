const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RevisionTrackerRoute = require("./routes");
const { MONGODB_URL, PORT } = require("./config/serverConfig");
const { weeklyJob, revisionJob } = require("./service/RevisionTracker");

const app = express();

// Set up Express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", RevisionTrackerRoute);
app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    /*
      useNewUrlParser option is used to parse the MongoDB connection string using the new URL parser in MongoDB.
      The useUnifiedTopology option is used to enable the new unified topology engine in MongoDB,
      which provides better support for replica sets and sharded clusters.
    */
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }

  console.log(`Server is running on port ${PORT}`);
  weeklyJob.start();
  revisionJob.start();
});
