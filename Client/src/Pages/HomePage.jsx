import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import BestSell from '../Components/BestSell'
import Category from '../Components/Category'
import Review from '../Components/Review'
import Footer from '../Components/Footer'

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <BestSell />
        <Category />
        <Review />
        <Footer />
    </div>
  )
}

export default HomePage
