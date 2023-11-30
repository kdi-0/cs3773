import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WelcomeHeader from "../components/WelcomeHeader";
import FeaturedProducts from "../components/FeaturedProducts";
import AboutUs from "../components/AboutUs";

export default async function page() {
  const slideData = [
    { id: 1, title: '', image: '/Dog.jpeg' },
    { id: 2, title: '', image: '/DogWithRoses.jpeg' },
  ];
  return (
    <>


      <div className="w-full mx-auto">
        <Navbar />
        {/* <Carousel slideData={slideData}/> */}
        <WelcomeHeader />
        <FeaturedProducts />
        <AboutUs />
      </div>
      <Footer />
    </>
  );
}
