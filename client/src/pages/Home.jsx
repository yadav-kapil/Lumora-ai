import Hero from "../components/HomeComponents/Hero";
import bgHero from "../assets/bgImages/bg_green1.jpeg";
import bgGifSection from "../assets/bgImages/testgrid.png";
import bgPromptbox from "../assets/bgImages/bg-with-grid.png";
import GifSection from "../components/HomeComponents/GifSection";
import Promptbox from "../components/HomeComponents/PromptboxPage/Promptbox";

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
      
    </>
  );
};

export default Home;
