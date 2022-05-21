import Head from 'next/head';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { useTheme } from 'styled-components';

import { PageContainer } from '../../styles';
import { useResultRouteState } from '../../pageHooks/result';
import {
  Card,
  Button,
  BlockIcon,
  CheckIcon,
  Typography,
} from '../../components';

export default function Result() {
  const { color } = useTheme();
  const routeState = useResultRouteState();
  return (
    <PageContainer>
      <Head>
        <title>App Quiz</title>
      </Head>
      <routeState.Confetti />
      <Card style={{ justifyContent: 'space-between' }}>
        <div style={styles.answerResult}>
          {routeState.answerResults.map((isCorrect, key) =>
            isCorrect ? (
              <CheckIcon color={color.green} size={20} key={key} />
            ) : (
              <BlockIcon color={color.red} size={20} key={key} />
            )
          )}
        </div>
        <div style={styles.resultTexts}>
          <Typography variant="subtitle">
            You've reached
            <Typography color="purple" variant="subtitle">
              {` ${routeState.correctAnswers} `}
            </Typography>
            out of
            <Typography color="purple" variant="subtitle">
              {` ${routeState.incorrectAnswers} `}
            </Typography>
            in {routeState.testDuration}
          </Typography>
          {routeState.passed ? (
            <Typography color="gray">Congratulations! You passed</Typography>
          ) : (
            <Typography color="gray">
              To pass the test, you need get at least
              {` ${routeState.minimunRequired} `}
              answers right
            </Typography>
          )}
        </div>
        <div style={styles.actions}>
          <Link href="/">
            <Button>Restart</Button>
          </Link>
        </div>
      </Card>
    </PageContainer>
  );
}

const styles: Record<string, CSSProperties> = {
  answerResult: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  resultTexts: {
    gap: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
};
