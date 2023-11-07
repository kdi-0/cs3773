"use client";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

function Advertisement() {
    return (
        <div className={"bg-red relative container max-h-65 overflow-y-hidden"}>

    <Carousel className={"max-h-full bg-red-500 "} showThumbs={false} autoPlay>
        <Image
            src={"/assets/Untitled.png"}
            width={500}
            height={100}
            alt={"..."}
        />
        <Image
            src={"/assets/dice.png"}
            width={500}
            height={100}
            alt={"..."}
        />
    </Carousel>
        </div>
    )
}

export default Advertisement;