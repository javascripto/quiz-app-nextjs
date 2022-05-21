import Head from 'next/head';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import {
  Card,
  Button,
  Progress,
  CheckIcon,
  BlockIcon,
  Typography,
} from '../components';
import { PageContainer } from '../styles';

const randomNumbers = Array.from({ length: 10 }, () => Math.random());

// https://www.figma.com/file/UIZMZ506JPWYLUzdxvDHMr/Frontend-Quiz-Challenge?node-id=0%3A1
// https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Quiz-App.md

export default function Home() {
  const { color } = useTheme();
  const [counter, setCounter] = useState(0);
  const rerender = () => setCounter(counter + 1);
  return (
    <PageContainer>
      <Head>
        <title>App Quiz</title>
      </Head>

      <Card
        style={{
          gap: '10px',
          width: '700px',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: 400,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {randomNumbers.map((number, key) =>
            number > 0.5 ? (
              <CheckIcon color={color.green} key={key} size={20} />
            ) : (
              <BlockIcon color={color.red} key={key} size={20} />
            )
          )}
        </div>
        <Typography variant="title">You're ready to start?</Typography>
        <Typography variant="subtitle" color="gray">
          It gonna take just a few minutes
        </Typography>
        <Typography variant="default" style={{ textAlign: 'center' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla
          nisl, porttitor nec lacinia vitae, tempor eget tellus.
        </Typography>
        <Typography variant="subtitle">
          You've reached
          <Typography color="purple" variant="subtitle">
            {' 8 '}
          </Typography>
          out of
          <Typography color="purple" variant="subtitle">
            {' 10 '}
          </Typography>
        </Typography>
        <Progress progress={Math.random() * 100} />
        <Button onClick={rerender}>Start</Button>
        <Button disabled>Disabled</Button>
      </Card>
    </PageContainer>
  );
}
