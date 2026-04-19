import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import { useState } from 'react';

const MainLayout = () => {

  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed top-0 w-full z-50">
        {showBanner && <Banner setShowBanner={setShowBanner} />}
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
