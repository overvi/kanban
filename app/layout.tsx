import DarkMode from "@/DarkMode";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./theme-config.css";
import { Theme } from "@radix-ui/themes";
import Query from "@/Query";

const jakarta = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Kanban -Task Management",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jakarta.variable}>
        <Query>
          <Theme>
            <DarkMode>
              <main>{children}</main>
            </DarkMode>
          </Theme>
        </Query>
      </body>
    </html>
  );
}
