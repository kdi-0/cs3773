import CategoryNavbar from '@/src/components/CategoryNavbar'
import Footer from '@/src/components/Footer';
import Items from '@/src/components/Items'
import Navbar from '@/src/components/Navbar'
import React from 'react'
import { Carousel } from 'react-responsive-carousel';

const page = () => {
    return (
        <div>
            <Navbar />
            <CategoryNavbar />
            <Items />
            <Footer/>
        </div>
    )
}

export default page