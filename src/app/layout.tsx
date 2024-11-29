import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { RainbowProvider } from "@/context/RainbowKitContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowProvider>
          <ThemeProvider>
            <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
              {children}
            </main>
          </ThemeProvider>
        </RainbowProvider>
      </body>
    </html>
  );
}
