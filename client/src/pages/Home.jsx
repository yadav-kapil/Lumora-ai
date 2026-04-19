import Hero from "../components/HomeComponents/Hero";
import bg from "../assets/bgImages/bg_green1.jpeg";

const Home = () => {
  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <Hero />
    </div>
  );
};

export default Home;
