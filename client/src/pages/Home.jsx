import Hero from "../components/HomeComponents/Hero";
import bgHero from "../assets/bgImages/bg_green1.jpeg";
import bgGifSection from "../assets/bgImages/testgrid.png";
import bgPromptbox from "../assets/bgImages/bg-with-grid.png";
import GifSection from "../components/HomeComponents/GifSection";
import Promptbox from "../components/HomeComponents/PromptboxPage/Promptbox";
import PricePage from "../components/HomeComponents/PricePage";
import Footer from "../components/HomeComponents/Footer";
import Faq from "../components/HomeComponents/Faq";

const Home = () => {
  return (
    <>
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        <Hero />
      </div>
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${bgGifSection})` }}
      >
        <GifSection />
      </div>
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${bgPromptbox})` }}
      >
        <Promptbox />
      </div>
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${bgPromptbox})` }}
      >
        <PricePage />
      </div>

      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_15%,rgba(34,197,94,0.07),transparent_55%),radial-gradient(circle_at_80%_85%,rgba(16,185,129,0.07),transparent_55%),linear-gradient(to_bottom_right,#ffffff,#f7fdf9,#ffffff)]">

  {/* BACKGROUND */}
  <div className="absolute inset-0 -z-10">

    {/* soft glow */}
    <div className="absolute top-[-120px] left-[6%] w-[260px] h-[260px] bg-green-400/10 blur-[160px] rounded-full"></div>
    <div className="absolute bottom-[-140px] right-[6%] w-[240px] h-[240px] bg-emerald-300/10 blur-[160px] rounded-full"></div>

    {/* center soft focus (reduced so grid shows) */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_75%)]"></div>

    {/* visible but premium grid */}
    <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

  </div>

  {/* CONTENT */}
  <div className="relative z-10">
    <Faq />
  </div>

</div>

      <div className="relative bg-gradient-to-br from-white via-green-50 to-white overflow-hidden">
        {/* very soft glow */}
        <div className="absolute top-0 left-1/3 w-[250px] h-[250px] bg-green-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-emerald-300/10 blur-[100px] rounded-full"></div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
