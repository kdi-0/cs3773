"use client";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

function Advertisement({ images, category }) {
    return (
        <div className="max-w-[1000px] mx-auto">
            <Carousel
                className="border border-gray-300 rounded-md overflow-hidden shadow-md"
                showThumbs={false}
                autoPlay
            >
                {images.map((image, index) => (
                    <div key={index} className="relative h-96">
                        <Image
                            src={image}
                            layout="fill"
                            objectFit="cover"
                            alt={`Advertisement ${index + 1}`}
                        />
                    </div>
                ))}
            </Carousel>

            <div className="mt-2 text-xl font-semibold">{category}</div>
        </div>
    );
}

export default Advertisement;