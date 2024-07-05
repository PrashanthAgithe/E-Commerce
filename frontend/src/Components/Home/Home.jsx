import React from 'react'
import './Home.css'
import hero_icon from '../Assets/hero.png'
import { FaLongArrowAltRight } from "react-icons/fa";
import Popular from '../Popular/Popular';
import Offers from '../Offers/Offers';
import NewCollections from '../NewCollections/NewCollections';
import Newsletter from '../Newsletter/Newsletter';
import { useDispatch } from 'react-redux';
import { setpage } from '../../Redux/slices/pageSlice';
const Home = () => {
  let dispatch=useDispatch()
  dispatch(setpage('home'))
  return (
    <div>
      <div className='main'>
        <div className="main-left">
          <h2>Shop in shop mart</h2>
          <h3>Best deals are available</h3>
          
          <div className="latest-btn" onClick={()=>{window.scrollTo({ top: 2000, behavior: 'smooth' })}}>
              <h4>Latest collections</h4>
              <FaLongArrowAltRight />
          </div>
        </div>
        <div className="main-right">
        <img src={hero_icon} alt="" style={{mixBlendMode:'multiply'}}/>
        </div>
      </div>
      <Popular />
      <Offers />
      <NewCollections />
      <Newsletter />
    </div>
  )
}

export default Home