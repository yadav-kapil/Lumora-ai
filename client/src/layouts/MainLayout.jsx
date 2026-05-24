import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Footer from "../components/home/Footer";

const MainLayout = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed top-0 w-full z-30">
        {showBanner && <Banner setShowBanner={setShowBanner} />}
        <Navbar showBanner={showBanner} />
      </div>
      <Outlet />
      <div className="relative bg-gradient-to-br from-white via-green-50 to-white overflow-hidden">
        {/* very soft glow */}
        <div className="absolute top-0 left-1/3 w-[250px] h-[250px] bg-green-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-emerald-300/10 blur-[100px] rounded-full"></div>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
