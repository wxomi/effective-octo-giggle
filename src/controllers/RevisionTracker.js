const {
  createRevisionTracker,
  getRevisionTracker,
} = require("../service/RevisionTracker");

const createRevisionTrackerController = async (req, res) => {
  try {
    const { url, name, revisionRequired } = req.body;
    const response = await createRevisionTracker({
      url,
      name,
      revisionRequired,
    });

    res.status(201).json({
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

const getRevisionTrackerController = async (req, res) => {
  try {
    const response = await getRevisionTracker();
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

const updateTodayRevisionController = async (req, res) => {};

module.exports = {
  createRevisionTrackerController,
  getRevisionTrackerController,
};
