import { useRouter } from 'next/navigation';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
const SearchBar = () => {
  const router = useRouter()

  function handleKeyPress(event) {
      // Check if the pressed key is "Enter" (key code 13)
      if (event.key === 'Enter') {
        // Call your function here
        console.log('pressed enter:', event.target.value)
        router.push(`/products?product_name=${event.target.value}`)
      }
    }


  return (
    <div>
      <div className="flex items-center bg-gray-100 p-2 rounded-full max-md:hidden">
        <button>
          <BiSearch size={20} className="opacity-50" />
        </button>
        <input
          type="text"
          className="outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
          placeholder="Search"
          autoComplete="false"
          maxLength={50}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchBar;
