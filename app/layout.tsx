import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
    title: "권우진 | Kwon Woojin",
    description: "Frontend Developer Resume & Portfolio",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className="bg-white font-sans text-gray-900 antialiased">
                <LanguageProvider>
                    <Nav />
                    <main>{children}</main>
                </LanguageProvider>
            </body>
        </html>
    );
}
