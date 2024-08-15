import { Suspense } from "react";
import EditProject from "./page";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return(
    <Suspense>
      <EditProject />
    </Suspense>
  )
}