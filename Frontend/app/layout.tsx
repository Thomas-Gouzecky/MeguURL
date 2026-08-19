import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import CustomCursor from "./_components/CustomCursor";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: site.title,
	description: site.description,
	icons: {
		icon: "/favicon-bigger.png",
	},
	openGraph: {
		title: site.title,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<CustomCursor />
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
