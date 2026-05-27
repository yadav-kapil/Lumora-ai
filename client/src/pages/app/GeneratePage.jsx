import { useState } from "react";
import Generate from "../../components/app/Generate";
import Topbar from "../../components/app/Topbar";
import Profile from "../../components/app/Profile";
import Setting from "../../components/app/Setting";

const GeneratePage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Topbar
        onProfileClick={() => setShowProfile(true)}
        onSettingsClick={() => setShowSettings(true)}
      />
      <Generate />

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
      {showSettings && <Setting onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default GeneratePage;
