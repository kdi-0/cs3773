'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  const router = useRouter();
  const [searchParam, setSearchParam] = useState('product_name');
  const [searchValue, setSearchValue] = useState('');

  function handleSearch() {
    router.push(`/products?product_search=${encodeURIComponent(searchValue)}`);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div>
      <div className="flex items-center bg-gray-100 p-2 rounded-full max-md:hidden flex-grow">
        <button onClick={handleSearch}>
          <BiSearch size={20} className="opacity-50" />
        </button>
        <input
          type="text"
          className="outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px] flex-grow"
          placeholder="Search"
          autoComplete="false"
          maxLength={50}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchBar;
