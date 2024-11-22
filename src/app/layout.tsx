import { ReactNode, Suspense } from 'react'; // Import Suspense from React
import type { Metadata } from 'next';
// import { Onest } from 'next/font/google'
import Head from 'next/head';
import { ReduxProvider } from './components/redux/provider';
import AppSnackBarProvider from './components/SnackBars/SnackBars';
import '../styles/globals.css';
import SplashScreen from './components/SplashScreen/SplashScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'PentaHR',
  description: 'PentaHR',
  keywords: 'PentaHR',
  openGraph: {
    title: '',
    description: '',
    url: '',
    siteName: 'PentaHR',
    images: [
      {
        url: '',
        alt: '',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </Head>
      <body>
        <AppSnackBarProvider>
          <ReduxProvider>
            <Suspense fallback={<SplashScreen />}>{children}</Suspense>
            <ToastContainer
              position="top-right"
              autoClose={500}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </ReduxProvider>
        </AppSnackBarProvider>
      </body>
    </html>
  );
}
