import React from 'react'
import Maindiv from '../../componets/MainDiv/MainDiv';
import FeaturedPro from '../../componets/FeaturedProducts/FeaturedPro';
import Features from '../../componets/Features/Features';
import Cosmetics from '../Clothes/Cosmetics/Cosmetics';
import Pharmaceuticals from '../Pharmaceutical/Pharmaceutical';
import Clothes from '../Clothes/Clothes'
import "./home.css"



const Home = () => {
  return (
    <div className='home'>
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
