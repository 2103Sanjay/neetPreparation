import { FaIcons } from "react-icons/fa";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Tutor LPT", // Default title without the icon
  description: "Generated by N./src/app/providers",
  faviconUrl: "/logo.jpg", 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <link rel="icon" type="image/jpeg" href={metadata.faviconUrl} />
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
