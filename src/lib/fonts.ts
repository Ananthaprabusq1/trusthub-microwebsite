import { Inter, Roboto } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "500"],
  variable: "--font-roboto",
  display: "swap",
});