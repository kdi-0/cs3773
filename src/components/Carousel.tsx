"use client"
import React, { useState } from "react";
import Image from 'next/image';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';

const SimpleCarousel = ({ slideData }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? slideData.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === slideData.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative text-white w-full mx-auto bg-orange-200"> {/* Add top margin/padding */}
            <div className="relative">
                <Image
                    src={slideData[activeIndex].image}
                    className='object-cover w-full h-[700px]'
                    alt={slideData[activeIndex].title}
                    width={400}
                    height={400}
                />
                <div className='absolute inset-0 flex items-center justify-between'>
                    <div
                        onClick={handlePrev}
                        className='cursor-pointer text-white p-4 hover:bg-black hover:bg-opacity-50'
                    >
                        <BiChevronsLeft className='text-3xl' />
                    </div>
                    <div
                        onClick={handleNext}
                        className='cursor-pointer text-white p-4 hover:bg-black hover:bg-opacity-50'
                    >
                        <BiChevronsRight className='text-3xl' />
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 p-4 text-center bg-white text-black/[0.9]'>
                {slideData[activeIndex].title}
            </div>
        </div>
    );
};

export default SimpleCarousel