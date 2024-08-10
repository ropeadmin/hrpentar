import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import Head from 'next/head';
import { ReduxProvider } from './components/redux/provider'
import AppSnackBarProvider from './components/SnackBars/SnackBars';
import './globals.css'
import { Suspense } from 'react'; // Import Suspense from React
import SplashScreen from './components/SplashScreen/SplashScreen';

const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PentaHR | ...",
  description: "PentaHR",
  keywords: "PentaHR",
  openGraph: {
    title: "Merch Store | Create Your Online Merch Store",
    description: "Merch Store empowers you to create and manage your own online merchandise store with ease. Offer a wide range of customizable products to your audience, backed by fast and reliable service.",
    url: "https://merchstore-v2.vercel.app",
    siteName: "Merch Store",
    images: [
      {
        url: "https://res.cloudinary.com/dtuims4ku/image/upload/v1722088055/merchstore_ubwjat.png",
        alt: "Merch Store Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </Head>
      <body className={onest.className}>
        <AppSnackBarProvider>
          <ReduxProvider>
            <Suspense fallback={<SplashScreen />}>
              {children}
            </Suspense>
          </ReduxProvider>
        </AppSnackBarProvider>
      </body>
    </html>
  )
}
