import type { Metadata } from 'next';
// import localFont from "next/font/local";
import './globals.css';
import { Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/components/custom/header';
import StoreProvider from './StoreProvider';
import { Toaster } from '@/components/ui/toaster';
import Refresher from '@/components/custom/refresher';
import QueryProvider from './QueryProvider';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
    title: 'Microservice-clientui',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
            <StoreProvider>
                <body className={cn('min-h-screen bg-backgroud font-manrope antialiased', manrope.variable)}>
                    <QueryProvider>
                        <Refresher>
                            <Header />
                            <main>{children}</main>
                            <Toaster />
                        </Refresher>
                    </QueryProvider>
                </body>
            </StoreProvider>
        </html>
    );
}
