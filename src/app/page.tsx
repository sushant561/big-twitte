import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tweet Generator',
  description: 'Create custom tweet previews',
};

import TweetGenerator from '@/components/TweetGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <TweetGenerator />
    </main>
  );
}
