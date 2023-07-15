const {
  createRevisionTracker,
  getRevisionTracker,
  getTodayQuestions,
  updateTodayQuestions,
  getAllQuestions,
} = require("../service/RevisionTracker");

const createRevisionTrackerController = async (req, res) => {
  try {
    const { url, name } = req.body;
    const response = await createRevisionTracker({
      url,
      name,
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

const getTodayQuestionsController = async (req, res) => {
  try {
    const response = await getTodayQuestions();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const updateTodayQuestionsController = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await updateTodayQuestions(id);
    res.status(200).json({
      status: "success",
      data: response,
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
        length: response.length,
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

const getAllQuestionsController = async (req, res) => {
  try {
    const response = await getAllQuestions();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = {
  createRevisionTrackerController,
  getRevisionTrackerController,
  createRevisionTrackerController,
  getTodayQuestionsController,
  updateTodayQuestionsController,
  getAllQuestionsController,
};
