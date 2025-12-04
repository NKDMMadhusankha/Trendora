import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import BestSell from '../Components/BestSell'
import Category from '../Components/Category'
import Review from '../Components/Review'

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <BestSell />
        <Category />
        <Review />
    </div>
  )
}

export default HomePage
