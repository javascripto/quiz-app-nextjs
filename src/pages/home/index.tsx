import Head from 'next/head';
import Link from 'next/link';

import { PageContainer } from '../../styles';
import { Card, Button, Typography } from '../../components';

export default function Home() {
  return (
    <PageContainer>
      <Head>
        <title>App Quiz</title>
      </Head>
      <Card centerContent>
        <Typography variant="title">Quiz App</Typography>
        <Typography variant="subtitle" color="gray">
          You're ready to start?
        </Typography>
        <Typography>It's gonna take just a few minutes</Typography>
        <Link href="quiz">
          <Button>Start</Button>
        </Link>
      </Card>
    </PageContainer>
  );
}
