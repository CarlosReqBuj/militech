import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Militech",
    description: "Application Web for Militech Corporation",
};

const estiloToast =
    "fixed top-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-sm bg-yellow-300 rounded-lg text-black shadow-md shadow-yellow-300/50";

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                {children}
                <Toaster
                    position="top-center"
                    style={{ "--width": "320px" }}
                    toastOptions={{
                        unstyled: true,
                        classNames: {
                            toast: estiloToast,
                        },
                    }}
                />
            </body>
        </html>
    );
}
