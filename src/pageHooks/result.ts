import Confetti from 'react-confetti';
import { useRouter } from 'next/router';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useMemo, useEffect, useState, createElement } from 'react';

interface ResultRouteState {
  testDuration: string;
  answerResults: boolean[];
}

const MINIMUM_CORRECT_ANSWERS = 7;

export function useResultRouteState() {
  const router = useRouter();
  const state: ResultRouteState = useMemo(
    () =>
      router.query.state
        ? JSON.parse(router.query.state as string)
        : {
            testDuration: '',
            answerResults: Array(10).fill(false),
          },
    []
  );
  const correctAnswers = state.answerResults?.filter(Boolean).length ?? 0;
  const incorrectAnswers = state.answerResults?.length ?? 0 - correctAnswers;
  const passed = correctAnswers >= MINIMUM_CORRECT_ANSWERS;

  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (passed) setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 6000);
  }, [passed]);
  return {
    ...state,
    passed,
    correctAnswers,
    minimunRequired: MINIMUM_CORRECT_ANSWERS,
    incorrectAnswers,
    Confetti: showConfetti
      ? () => createElement(Confetti, { width, height })
      : () => null,
  };
}
