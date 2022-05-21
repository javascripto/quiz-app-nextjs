import Head from 'next/head';
import { CSSProperties } from 'react';

import {
  Card,
  Button,
  Progress,
  Typography,
  Alternative,
  LoadingCircle,
} from '../../components';
import { PageContainer } from '../../styles';
import { useQuiz } from '../../pageHooks/quiz';

export default function Quiz() {
  const quiz = useQuiz();
  return (
    <PageContainer>
      <Head>
        <title>App Quiz</title>
      </Head>
      {quiz.isLoadingQuestions ? (
        <Card centerContent>
          <LoadingCircle />
          <Typography>Loading questions...</Typography>
        </Card>
      ) : (
        <Card>
          <Progress progress={quiz.currentProgress} />
          <Typography variant="subtitle">
            {quiz.currentQuestion.question}
          </Typography>
          <div style={styles.alternatives}>
            {quiz.currentQuestion.alternatives.map((alternative) => (
              <Alternative
                value={alternative}
                onClick={quiz.chooseAnswer}
                key={quiz.currentQuestion.question + alternative}
              >
                <Typography>{alternative}</Typography>
              </Alternative>
            ))}
          </div>
          <div style={styles.actions}>
            <div>
              {quiz.canShowNextQuestionButton && (
                <Button onClick={quiz.goToNext}>Next</Button>
              )}
              {quiz.canShowFinishButton && (
                <Button onClick={quiz.showResults}>Finish</Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </PageContainer>
  );
}

const styles: Record<string, CSSProperties> = {
  alternatives: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  actions: {
    flex: 1,
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
  },
};
