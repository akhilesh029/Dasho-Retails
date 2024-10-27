import React from 'react'
import Maindiv from '../../../componets/MainDiv/MainDiv';
import FeaturedPro from '../../../componets/FeaturedProducts/FeaturedPro';
import Features from '../../../componets/Features/Features';
import Cosmetics from '../Cosmetics/Cosmetics';
import Pharmaceuticals from '../../Pharmaceutical/Pharmaceutical';
import Clothes from '../Clothes'
import "./home.css"
import Shop from '../../../componets/Shops/Shop';



const Home = () => {
  return (
    <div className='home'>
        <Shop />
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
