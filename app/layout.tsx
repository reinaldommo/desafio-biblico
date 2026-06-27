import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, Sora } from "next/font/google";
import "./globals.css";
import { PWAProvider } from "@/components/pwa/PWAProvider";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const numeric = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-numeric",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desafio Bíblico — IEPP",
  description:
    "Gincana Bíblica interativa da Igreja Evangélica Pentecostal Presbiteriana. Momento de comunhão e conhecimento da Palavra de Deus.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Desafio Bíblico",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0608",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Tema de cores: "church" (preto/vermelho/dourado) é o padrão.
    // Para voltar ao tema antigo (roxo/dourado), troque para data-theme="legacy".
    <html
      lang="pt-BR"
      data-theme="church"
      className={`${display.variable} ${body.variable} ${numeric.variable}`}
    >
      <body>
        <PWAProvider>{children}</PWAProvider>
      </body>
    </html>
  );
}
