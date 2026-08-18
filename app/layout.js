import "./globals.css";
import { SessionProvider } from "../lib/session";
import { DataProvider } from "../lib/data-store";

export const metadata = {
  title: "ScaleFusion Telcel — Diagnóstico y Delivery",
  description: "Demo local de navegación — no conectado a base de datos real",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="text-slate-900">
        <SessionProvider>
          <DataProvider>{children}</DataProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
