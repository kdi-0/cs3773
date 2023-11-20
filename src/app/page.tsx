import Navbar from "../components/Navbar";
import { getCurrentUser } from "../lib/session"
import ImageSlider from "@/src/components/Home/ImageSlider";
import ItemsList from "@/src/components/landing/ItemList";
import Footer from "@/src/components/landing/Footer";

export default async function Home() {

    const slides = [
        {url: 'http://localhost:3000/assets/FirstDog.png', title: 'German Shepherd'},
        {url: 'http://localhost:3000/assets/Untitled.png', title: 'Dog Day'},
        {url: 'http://localhost:3000/assets/dice.png', title: 'Nassau'},
    ]


//TODO CHANGE TO MATCH FIGMA
    const containerStyles = {
        width: '100%',
        height: '480px',
        margin: "0 auto",
    }

  const user = await getCurrentUser()
  console.log(user)
  return (
    <div className="max-w-none mx-auto">
        <Navbar/>
        <div style={containerStyles}>
            <ImageSlider slides={slides}/>
        </div>
        <ItemsList/>
        <Footer/>
    </div>
  );
}
