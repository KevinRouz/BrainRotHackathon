import { useRouter } from 'next/navigation';
import Layout from './Layout';
import Button from './Button';

interface CardPageProps {
  title: string;
  gradient: string;
}

export default function CardPage({ title, gradient }: CardPageProps) {
  const router = useRouter();

  return (
    <Layout>
      <div className={`min-h-screen flex flex-col items-center justify-center p-8 ${gradient}`}>
        <h1 className="text-4xl font-bold mb-8 text-white">{title}</h1>
        <p className="text-xl text-white mb-8">Content for {title} goes here.</p>
        <Button onClick={() => router.push('/home')}>Back to Home</Button>
      </div>
    </Layout>
  );
}

