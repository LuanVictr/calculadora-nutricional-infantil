import "./globals.css";
import { Nunito } from "next/font/google";
import { AppProvider } from "@/contexts/app-context";
import { ThemeProvider } from "@/components/theme-provider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Triagem Nutricional Pediátrica",
  description:
    "Sistema de avaliação nutricional baseado em protocolos da OMS e STRONGkids",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={nunito.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppProvider>
            <div className="min-h-screen bg-background">{children}</div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
