import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WelcomeHeader from '../components/WelcomeHeader';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutUs from '../components/AboutUs';

export default async function page() {
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
