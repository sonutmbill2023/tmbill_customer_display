import React from 'react'
import UpcomeOffer from '../asset/upcoming_offer.jpg'
import tmbillimg from '../asset/tmbillimg.jpg'
import classes from '../css/upcomoffer.module.css'
import offer1 from '../asset/offer1.jpg';
import offer2 from  '../asset/offer2.jpg'
function UpcomingOffer() {
  return (
    <div>
    <div className={classes.offer}>
   <img src={UpcomeOffer} alt="offer" />
    </div>
    <div  className={classes.img}>
    <div>
        <img src={offer1}  alt='offer1'/>
    </div>
    <div>
        <img src={offer2}  alt='offer2'/>
    </div>
    <div>
        <img src={offer1}  alt='offer3'/>
    </div>
    </div>
    {/* <div className={classes.ico}>
        <img src={tmbillimg} alt="ico" /> 
    </div> */}
    
      
    </div>
  )
}

export default UpcomingOffer
