// app/layout.js
import './globals.css';

export const metadata = {
  title: 'ZooQuest Widget',
  description: 'Animal Chatbot Widget',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
