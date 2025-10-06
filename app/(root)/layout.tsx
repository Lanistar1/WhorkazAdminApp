import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex h-full w-screen overflow-hidden">
      <Navbar />
      <div className="flex-1 overflow-auto max-w-full">
        <div className="w-full h-full overflow-x-hidden">{children}</div>
      </div>
    </main>
  );
}
