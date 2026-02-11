import Header from '@/components/header';
import Footer from '@/components/footer';
import SessionWrapper from '@/components/SessionWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionWrapper>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}