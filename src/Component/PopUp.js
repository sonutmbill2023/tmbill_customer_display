import React, { useEffect, useState } from 'react'
import classes from '../css/Popup.module.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
function PopUp(props) {
    const history = useHistory()
    const [IpAdd,setIpADD] = useState('')
    const [data,setData] = useState([])
    const iphandler = (e)=>{
      setIpADD(e.target.value)
    }
const submitHandler  =(e)=>{
 e.preventDefault()

let obj= {
  ip:IpAdd
}
setData([obj])

 history.push('/Loginpage')
}
 useEffect(()=>{
props.getip(data)
 })
console.log(data)
  return (

    <div className={classes.top}>
    <div>
      <div>
        <h6>Altantic POS found...</h6>
      </div>
      <div   className={classes.popup}>
      <div>
        <p>{`Foodies-World`}</p>
        <p>{data.map((item)=>(<span key={item.ip}>
          {item.ip}
        </span>))} </p>
        
      </div>
      <form  onSubmit={submitHandler}>
      <div className={classes.input}>
         <input type='text' value={IpAdd} onChange={iphandler} placeholder='Please enter your IP Address'></input>
          </div> 
      <div>
        <button   className='btn btn-dark btn-sm' >Connect</button>
      </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default PopUp
