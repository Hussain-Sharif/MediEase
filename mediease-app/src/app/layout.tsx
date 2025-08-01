import type { Metadata } from "next";
import "./globals.css"



export const metadata: Metadata = {
  title: "Mediease",
  description: "Simple Healthcare Appointment Booking Interface that allows users to view doctors, check their availability, and book an appointment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
