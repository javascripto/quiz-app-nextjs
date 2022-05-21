import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { Duration } from '../utils';
import { useQuestions } from '../requests';

export function useQuiz() {
  const router = useRouter();
  const startedAt = useMemo(() => new Date(Date.now()), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  const [answerResults, setAnswerResults] = useState<boolean[]>([]);

  const { data = [], isValidating } = useQuestions();

  const questions = data;
  const isLoadingQuestions = isValidating;

  const currentQuestion = questions[currentIndex];
  const currentResult = currentAnswer === currentQuestion?.correctAnswer;
  const currentProgress = 100 * (currentIndex / questions.length);
  const isLastQuestion = currentQuestion == questions[questions.length - 1];
  const canShowFinishButton = currentAnswer !== undefined && isLastQuestion;
  const canShowNextQuestionButton =
    currentAnswer !== undefined && !isLastQuestion;

  function chooseAnswer(answer: string) {
    setCurrentAnswer(answer);
  }
  function goToNext() {
    setAnswerResults([...answerResults, currentResult]);
    setCurrentAnswer(undefined);
    if (!isLastQuestion) setCurrentIndex(currentIndex + 1);
  }
  function showResults() {
    console.table(questions);
    const finishedAt = new Date(Date.now());
    router.push(
      {
        pathname: '/result',
        query: {
          state: JSON.stringify({
            answerResults: [...answerResults, currentResult],
            testDuration: new Duration({
              milliseconds: finishedAt.getTime() - startedAt.getTime(),
            }).toTimeString(),
          }),
        },
      },
      '/result'
    );
  }

  return {
    goToNext,
    showResults,
    chooseAnswer,
    isLastQuestion,
    currentQuestion,
    currentProgress,
    isLoadingQuestions,
    canShowFinishButton,
    canShowNextQuestionButton,
  };
}
