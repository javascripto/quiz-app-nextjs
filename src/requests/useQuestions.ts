import useSWR from 'swr';
import { Question } from '../pages/api/quiz';
import { decodeHTMLEntities, delayPromise, handleFetch } from '../utils';

async function fetchQuestions() {
  return fetch('/api/quiz')
    .then<Question[]>(handleFetch)
    .then(delayPromise(500))
    .then((questions) => {
      return questions.map<Question>((question) => ({
        question: decodeHTMLEntities(question.question),
        correctAnswer: decodeHTMLEntities(question.correctAnswer),
        alternatives: question.alternatives.map(decodeHTMLEntities),
      }));
    });
}

export function useQuestions() {
  return useSWR('/api/quiz', fetchQuestions, {
    revalidateOnFocus: false,
  });
}
