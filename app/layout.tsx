import '@/app/ui/global.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/40
                       dark:from-gray-950 dark:via-gray-900 dark:to-gray-800
                       text-gray-900 dark:text-gray-100">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
