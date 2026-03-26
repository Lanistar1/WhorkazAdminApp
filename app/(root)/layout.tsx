// import { Navbar } from "@/components/Navbar";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <main className="relative flex h-full w-screen overflow-hidden">
//       <Navbar />
//       <div className="flex-1 overflow-auto max-w-full">
//         <div className="w-full h-full overflow-x-hidden">{children}</div>
//       </div>
//     </main>
//   );
// }



import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 h-full z-50">
        <Navbar />
      </div>

      {/* Content area */}
      <div className="ml-[305px] h-full overflow-auto">
        <div className="w-full h-full overflow-x-hidden">
          {children}
        </div>
      </div>
    </main>
  );
}