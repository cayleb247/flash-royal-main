import User from "../Models/user.js";
import QuestionSet from "../Models/questionSet.js";

export async function getQuestionSets(username, callback) {
  try {
    const user = await User.findOne({ username });
    const questionSets = await QuestionSet.find({ ownerId: user._id });
    callback(questionSets);
  } catch (err) {
    callback(null, err);
  }
}

export async function createQuestionSet(username, questions, name, callback) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      callback(null, new Error("User not found"));
    }

    const questionSet = new QuestionSet({
      ownerId: user._id,
      questions,
      name,
    });

    const savedQuestionSet = await questionSet.save();
    callback(savedQuestionSet);
  } catch (err) {
    callback(null, err);
  }
}
