import { siteConfig } from "@/config/site";
import "./globals.css";
import ReactQueryProvider from "./(platform)/providers/tanstackProvider";
import { ThemeProvider } from "./(platform)/providers/themeProvider";
import { ModalProvider } from "./(platform)/_components/ModalProvider";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    url: "/logo.svg",
    href: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ReactQueryProvider>
          <ThemeProvider>
            <ModalProvider />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
