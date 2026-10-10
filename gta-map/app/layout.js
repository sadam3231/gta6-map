import "./globals.css";

export const metadata = {
  title: "GTA Interactive Map (Starter)",
  description: "Interactive map with categories and progress tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
