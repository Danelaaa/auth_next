import "../styles/globals.css";
import Header from "../app/components/Header.js";

export const metadata = {
  title: "Auth App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
