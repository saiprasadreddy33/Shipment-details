import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="h-screen bg-gray-100">
        <div className="h-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
