import Navbar from "../components/Navbar";
import Advertisement from "../components/landing/Advertisement"
import ItemList from "../components/landing/ItemList"

export default function Home() {
  return (
    <div className="max-w-screen w-full min-h-screen">
      <Navbar/>
        <Advertisement />
        <ItemList />
    </div>
  );
}
