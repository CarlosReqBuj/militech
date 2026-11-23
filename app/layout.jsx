import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Militech Corporation",
    description: "Panel de gestión corporativa",
    manifest: "/manifest.webmanifest?v=0.1",
    applicationName: "Militech",

    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Militech",
    },

    icons: {
        icon: "/icon-192.png",
        apple: "/icon-192.png",
    },
};

export const viewport = {
    themeColor: "#09090b",
    width: "device-width",
    initialScale: 1,
};

const estiloToast =
    "!flex !w-[calc(100vw-32px)] !max-w-[400px] !min-w-0 !items-center !justify-center !gap-2 !whitespace-normal !break-words !rounded-lg !bg-yellow-300 !px-4 !py-3 !text-center !text-sm !text-black !shadow-md !shadow-yellow-300/50";

export default function RootLayout({ children }) {
    return (
        <html
            lang="es"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <ServiceWorkerRegister />

                {children}

                <Toaster
                    position="top-center"
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
