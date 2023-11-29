import Image from 'next/image';
import Carousel from './Carousel'; // Import your SimpleCarousel component

export default async function page() {
  const slideData = [
    { id: 1, title: '', image: '/Dog.jpeg' },
    { id: 2, title: '', image: '/DogWithRoses.jpeg' },
  ];
  return (
    <div className="bg-orange-200 py-16">
      <div className="max-w-6xl mx-auto flex items-center">
        <div className="flex-1">
          <h2 className="text-6xl font-bold text-black mb-4">
            Welcome To
            <br />
            All Pet Products
          </h2>
          <p className="text-black mb-6">
            Discover unique critter-themed treasures at Critter Collectibles. 🐾
          </p>
          <button className="bg-transparent border border-black rounded-full px-6 py-2 text-black hover:bg-black hover:text-white">
            Shop Now
          </button>
        </div>
        <div className="flex-1 ml-8">
          {/* Place your image here */}
          <Image
            src="/dogwithhat.png" // Replace with the actual image path
            alt="Pet Products Image"
            width={500}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
