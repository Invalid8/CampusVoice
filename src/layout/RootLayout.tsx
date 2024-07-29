import { Footer, Navbar } from "@/components/resusable";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground">
      <Navbar />
      <div className="flex w-full min-h-[85svh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
