import Navbar from "../components/Navbar";
import Items from "../components/Items";
import { getCurrentUser } from "../lib/session"

export default async function Home() {
  const user = await getCurrentUser()
  console.log(user)
  return (
    <div className="p-4 max-w-[2000px] mx-auo">
      <Navbar/>
      <Items/>
    </div>
  );
}
