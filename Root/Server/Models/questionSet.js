import mongoose from "mongoose";

const questionSetSchema = new mongoose.Schema({
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      pointValue: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
});

const QuestionSet = mongoose.model("questionSet", questionSetSchema);

export default QuestionSet;
