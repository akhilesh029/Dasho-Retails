import React from 'react'
import Maindiv from '../componets/MainDiv/MainDiv';
import FeaturedPro from '../componets/FeaturedProducts/FeaturedPro';
import Features from '../componets/Features/Features';
import Cosmetics from '../Pages/Clothes/Cosmetics/Cosmetics';
import Pharmaceuticals from '../Pages/Pharmaceutical/Pharmaceutical';
import Clothes from '../Pages/Clothes/Clothes'



const Home = () => {
  return (
    <div>
        <Maindiv />
        <FeaturedPro />
        <Features />
        <Cosmetics />
        <Pharmaceuticals />
        <Clothes />
    </div>
  )
}

export default Home
