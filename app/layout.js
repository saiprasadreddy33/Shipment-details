import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="h-screen bg-gray-100">
        {children}
      </body>
    </html>
  );
}
