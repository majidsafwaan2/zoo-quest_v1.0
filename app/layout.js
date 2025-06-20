// app/layout.js
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "ZooQuest – Talk to Endangered Animals",
  description: "An AI chatbot to build empathy and support animal conservation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 font-sans">
        <header className="bg-green-700 text-white py-4 shadow-md">
          <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="mr-4">
  <img
    src="/images/logo.png"
    alt="ZooQuest Logo"
className="h-7 sm:h-7 md:h-8 lg:h-9 w-auto"
  />
</Link>


            <div className="space-x-4 text-base font-semibold">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/science" className="hover:underline">Research</Link>
              <Link href="/chat" className="hover:underline">Demo</Link>
              <Link href="/ngo-toolkit" className="hover:underline">Toolkit</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 mt-20">
          © {new Date().getFullYear()} ZooQuest | Built for Conservation
        </footer>
      </body>
    </html>
  );
}
