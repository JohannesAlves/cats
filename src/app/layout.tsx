import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Many Cats.',
  description: 'A cats app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
