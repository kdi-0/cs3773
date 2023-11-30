import Link from 'next/link';

const CategoryNavbar = () => {
  return (
    <nav className="bg-orange-300 p-4 text-center">
      <ul className="flex justify-center space-x-8 text-white">
        <li className="hover:bg-white-600 rounded-md p-2 transition duration-300 ease-in-out">
          <Link href="/category1">Category 1</Link>
        </li>
        <li className="hover:bg-white-600 rounded-md p-2 transition duration-300 ease-in-out">
          <Link href="/category2">Category 2</Link>
        </li>
        {/* Add more category links here */}
      </ul>
    </nav>
  );
};

export default CategoryNavbar;
