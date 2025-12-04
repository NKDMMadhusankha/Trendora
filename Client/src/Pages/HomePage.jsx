import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import BestSell from '../Components/BestSell'
import Category from '../Components/Category'

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <BestSell />
        <Category />
    </div>
  )
}

export default HomePage
