// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { NextApiHandler } from 'next';

interface APIResponse {
  results: APIQuestion[];
}

interface APIQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Question {
  question: string;
  correctAnswer: string;
  alternatives: string[];
}

const quizURL =
  'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple';

function shuffle(a: unknown, b: unknown) {
  return Math.random() < 0.5 ? 1 : -1;
}

function mapQuestions(apiQuestion: APIQuestion): Question {
  const { question, correct_answer, incorrect_answers } = apiQuestion;
  return {
    question,
    correctAnswer: correct_answer,
    alternatives: [...incorrect_answers, correct_answer]
      .sort(shuffle)
      .sort(shuffle),
  };
}

const handler: NextApiHandler = async (_request, response) => {
  return axios.get<APIResponse>(quizURL).then(({ data }) => {
    const { results } = data;
    const questions = results.map(mapQuestions);
    return response.status(200).json(questions);
  });
};

export default handler;
