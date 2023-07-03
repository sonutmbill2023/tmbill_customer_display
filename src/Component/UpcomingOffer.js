import React, { useEffect, useRef, useState } from "react";
import UpcomeOffer from "../asset/upcoming_offer.jpg";
import tmbillimg from "../asset/tmbillimg.jpg";
import classes from "../css/upcomoffer.module.css";
import offer1 from "../asset/offer1.jpg";
import offer2 from "../asset/offer2.jpg";
import resbig1 from '../asset/restbig1.jpg'
import "../css/imageUpload.css";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import sound from "../asset/confirmationsound.wav";
function UpcomingOffer() {
  const history = useHistory();
  const upcomeref = useRef()
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const [image3, setImage3] = useState("");

  const [singleImgeHookOne,setSinleImgHookOne]  = useState("")
  const [doubleimgeHookOne,setDoubleImgHookOne] = useState("")
  const [doubleimgeHookTwo,setDoubleImgHookTwo] = useState("")
  const [uploadfile, setUploadFile] = useState(false);
  const [logoutBUtton, setLogOutButton] = useState(false);
 const [upcomeningoffertext,setUpcomeningOfferText] = useState(false)
 const [upcomehook,setupcomehook] = useState('')
const  [ threeImage,setTheeImage]  =  useState(()=>{
  const storedState = window.localStorage.getItem('threeImage');
  return storedState ? JSON.parse(storedState) :true;
})
const  [ twoImage,setTwoImage]  = useState(()=>{
   const storedState = window.localStorage.getItem('twoImage');
   return storedState ? JSON.parse(storedState) :false;
})
const  [ OneImage,setOneImage]  = useState(()=>{
  const storedState = window.localStorage.getItem('OneImage');
  return storedState ? JSON.parse(storedState) :false;
})




  const imageHandler1 = (e) => {
    const file = e.target.files[0];
    localStorage.setItem("file1", file.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result;
        setImage1(imageDataUrl);
        localStorage.setItem("image1", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageHandler2 = (e) => {
    const file = e.target.files[0];
    localStorage.setItem("file2", file.name);
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result;

        setImage2(imageDataUrl);
        localStorage.setItem("image2", imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const imageHandler3 = (e) => {
    const file = e.target.files[0];
    localStorage.setItem("file3", file.name);
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result;

        setImage3(imageDataUrl);
        localStorage.setItem("image3", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

// single imgae 


const singleImageone = (e) => {
  const file = e.target.files[0];
  localStorage.setItem("Singlenameone", file.name);
  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;

      setSinleImgHookOne(imageDataUrl);
      localStorage.setItem("singleimgone", imageDataUrl);
    };
    reader.readAsDataURL(file);
  }
};


//double img 
const  doubleimgone = (e) => {
  const file = e.target.files[0];
  localStorage.setItem("doublenameone", file.name);
  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;

      setDoubleImgHookOne(imageDataUrl);
      localStorage.setItem("doubleimgone", imageDataUrl);
    };
    reader.readAsDataURL(file);
  }
};

const  doubleimgtwo = (e) => {
  const file = e.target.files[0];
  localStorage.setItem("doublenametwo", file.name);
  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;

      setDoubleImgHookTwo(imageDataUrl);
      localStorage.setItem("doubleimgtwo", imageDataUrl);
    };
    reader.readAsDataURL(file);
  }
};






  useEffect(() => {
    const savedImage1 = localStorage.getItem("image1");
    if (savedImage1) {
      setImage1(savedImage1);
    }
    const savedImage2 = localStorage.getItem("image2");

    if (savedImage2) {
      setImage2(savedImage2);
    }

    const savedImage3 = localStorage.getItem("image3");
    if (savedImage3) {
      setImage3(savedImage3);
    }

    const savedsingle1 = localStorage.getItem("singleimgone")
if(savedsingle1){
  setSinleImgHookOne(savedsingle1);
}


const saveddoubleone = localStorage.getItem("doubleimgone")
if(saveddoubleone){
   setDoubleImgHookOne(saveddoubleone)
}

const saveddoubletwo = localStorage.getItem("doubleimgtwo")
if(saveddoubletwo){
   setDoubleImgHookTwo(saveddoubletwo)
}

  }, []);

  /*logout confirmation */
  const logout = () => {
    new Audio(sound).play();
    confirmAlert({
      message: "Do you really want to exit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            history.push("/Loginpage");
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  const SettingHandler = () => {
    setLogOutButton(!logoutBUtton);
  };


  // image handler 

const threeImgaeHandler  = ()=>{
setTheeImage(true)
setTwoImage(false)
setOneImage(false)
window.localStorage.setItem('threeImage',JSON.stringify(true))
window.localStorage.setItem('twoImage',JSON.stringify(false))
window.localStorage.setItem('OneImage',JSON.stringify(false))
}
const twoImgaeHandler  = ()=>{
  setTheeImage(false)
  setTwoImage(true)
setOneImage(false)

window.localStorage.setItem('threeImage',JSON.stringify(false))
window.localStorage.setItem('twoImage',JSON.stringify(true))
window.localStorage.setItem('OneImage',JSON.stringify(false))

}
const oneImgaeHandler  = ()=>{
  setTheeImage(false)
  setTwoImage(false)
setOneImage(true)
window.localStorage.setItem('threeImage',JSON.stringify(false))
window.localStorage.setItem('twoImage',JSON.stringify(false))
window.localStorage.setItem('OneImage',JSON.stringify(true))
}

//upcomingoffer 
 const upcomingOfferHandler = ()=>{
  setUpcomeningOfferText(true)
 }

 useEffect(()=>{
  setupcomehook(localStorage.getItem('upcomeinput'))
 })

  const offerSubmitHandler = (e)=>{
 e.preventDefault()
 const upcomeinput = upcomeref.current.value;
localStorage.setItem('upcomeinput',upcomeinput)
setupcomehook(upcomeinput)
 console.log(upcomeinput)
  }

  return (
    <div>
      <div className={classes.main}>
        <div className={classes.offer}>
        {upcomehook ? <h6>{upcomehook}</h6> :  <img src={UpcomeOffer} alt="offer" /> } 
        </div>
        <div className={classes.img}>
          {threeImage && ( <div className={classes.threeimage }>

     
          <div>
            {localStorage.getItem("image1") ? (
              <img src={image1} alt="offer1" />
            ) : (
              <img src={offer1} alt="offer1" />
            )}
          </div>
          <div>
            {localStorage.getItem("image2") ? (
              <img src={image2} alt="offer1" />
            ) : (
              <img src={offer2} alt="offer1" />
            )}
          </div>
          <div>
            {localStorage.getItem("image3") ? (
              <img src={image3} alt="offer1" />
            ) : (
              <img src={offer1} alt="offer1" />
            )}
          </div>
          </div> ) }

          {/* single image ***********************/}
           {OneImage && (<div  className={classes.singleImg}>
            <div>
            { localStorage.getItem("singleimgone") ? (
              <img src={singleImgeHookOne} alt="offer1" />
            ) : (
              <img src={resbig1} alt="offer1" />
            )}
          </div>
           </div>  )}
          {/* single image ***********************/}
          {/* Double Image****************** */}

        {twoImage && (  <div className={classes.DoubleImg}>
          <div>
            {  localStorage.getItem("doubleimgone") ? (
              <img src={doubleimgeHookOne} alt="offer1" />
            ) : (
              <img src={offer1} alt="offer1" />
            )}
          </div>
          <div>
            {  localStorage.getItem("doubleimgtwo") ? (
              <img src={doubleimgeHookTwo} alt="offer1" />
            ) : (
              <img src={offer2} alt="offer1" />
            )}
          </div>
          </div>)}

          {/* Double Image****************** */}
        </div>
        {/* <div className={classes.ico}>
        <img src={tmbillimg} alt="ico" /> 
    </div> */}

        {uploadfile && (
          <div className={classes.setting}>
            <div className={classes.settinghead}>
              <h4>Select Offer Images from here... </h4>
              <button
                className="btn btn-default"
                onClick={() => setUploadFile(false)}
              >
                <CloseIcon />
              </button>
            </div>
            {/* button settin1 */}
<div style={{display:'flex',justifyContent:'space-around'}}  className={classes.imagesbutton}>
   
    <button className="btn btn-default btn-sm   " onClick={threeImgaeHandler} >Show three Images</button>
    <button   className="btn btn-default btn-sm    " onClick={twoImgaeHandler} >Show  two Images</button>
    <button   className="btn btn-default btn-sm    " onClick={oneImgaeHandler} >Show  one Images</button>
    <button  className="btn btn-default btn-sm  " onClick={upcomingOfferHandler}>UpcomingOffer</button>
  
</div>

{/* upcoming  offer card */}
{upcomeningoffertext &&(<div className={classes.upcometext}>

<div className={classes.offerhead }>
              <h4> Change Offer from here... </h4>
              <button
                className="btn btn-default"
                onClick={() =>setUpcomeningOfferText(false)}
              >
                <CloseIcon />
              </button>
            </div>
<div>
<form onSubmit={offerSubmitHandler}>
<div  className="form-group p-2"  >
  <input type="text" className="form-control" placeholder="upcoming offer" ref={upcomeref} maxLength={15} />
  <button className="btn btn-warning btn-sm mt-2">Submit</button></div>
  </form>
  <div  style={{marginTop:'5px',textAlign:'center'}}>
  <h6>{upcomehook}</h6>
</div>

</div>
</div>)}
 {/* button settin */}
{/*  three image  */}
           {threeImage && ( <div>
              <div>
                <p>
                  Note :{" "}
                  <small>
                    You can upload an Image In JPEG, PNG ,GIF format and Fixed
                    Aspect Ratio is 300 X 450.
                  </small>
                </p>
              </div>
              <div className={classes.imglabel}>
                <div className="uploadimage">
                  <section>Image - 1</section>
                  <input id="imgs1" type="file" onChange={imageHandler1} />
                  <label htmlFor="imgs1"> Choose File</label>
                  <span>
                    {localStorage.getItem("file1")
                      ? localStorage.getItem("file1")
                      : "offer1.jpeg"}
                  </span>
                </div>

                <div className="uploadimage">
                  <section>Image - 2</section>
                  <input id="imgs2" type="file" onChange={imageHandler2} />

                  <label htmlFor="imgs2"> Choose File</label>
                  <span>
                    {localStorage.getItem("file2")
                      ? localStorage.getItem("file2")
                      : "offer2.jpeg"}
                  </span>
                </div>

                <div className="uploadimage">
                  <section>Image - 3</section>
                  <input id="imgs3" type="file" onChange={imageHandler3} />
                  <label htmlFor="imgs3"> Choose File</label>
                  <span>
                    {localStorage.getItem("file3")
                      ? localStorage.getItem("file3")
                      : "offer3.jpeg"}
                  </span>
                </div>
              </div>
            </div>)}
 {/* 8888 tow image  */}

        { twoImage && (<div>
              <div>
                <p>
                  Note :{" "}
                  <small>
                    You can upload an Image In JPEG, PNG ,GIF format and Fixed
                    Aspect Ratio is 500 X 400.
                  </small>
                </p>
              </div>
              <div className={classes.imglabel}>
                <div className="uploadimage">
                  <section>Image - 1</section>
                  <input id="doubleone" type="file" onChange={doubleimgone} />
                  <label htmlFor="doubleone"> Choose File</label>
                  <span>
                    {localStorage.getItem("doublenameone")
                      ? localStorage.getItem("doublenameone")
                      : "offer1.jpeg"}
                  </span>
                </div>

                <div className="uploadimage">
                  <section>Image - 2</section>
                  <input id="doubletwo" type="file" onChange={doubleimgtwo} />

                  <label htmlFor="doubletwo"> Choose File</label>
                  <span>
                    {localStorage.getItem("doublenametwo")
                      ? localStorage.getItem("doublenametwo")
                      : "offer2.jpeg"}
                  </span>
                </div>

                
              </div>
            </div>) }

            {/*  one imge */}

           {OneImage && ( <div>
              <div>
                <p>
                  Note :{" "}
                  <small>
                    You can upload an Image In JPEG, PNG ,GIF format and Fixed
                    Aspect Ratio is 700 X 450.
                  </small>
                </p>
              </div>
              <div className={classes.imglabel}>
                <div className="uploadimage">
                  <section>Image - 1</section>
                  <input id="singleone" type="file" onChange={singleImageone} />
                  <label htmlFor="singleone"> Choose File</label>
                  <span>
                    {localStorage.getItem("Singlenameone")
                      ? localStorage.getItem("Singlenameone")
                      : "offer1.jpeg"}
                  </span>
                </div>
 

                 
              </div>
            </div>)}

            {/* last imga  */}
          </div>
        )}

        <div className="bottomline"> </div>

        <div className="uploadicon">
          <button
            className="btn btn-default btn-sm"
            onClick={() => SettingHandler()}
          >
            <SettingsIcon />
          </button>
          {logoutBUtton && (
            <button
              className="btn btn-default btn-sm"
              onClick={() => setUploadFile(!uploadfile)}
            >
              <CloudUploadIcon />
            </button>
          )}

          {logoutBUtton && (
            <button className="btn btn-default btn-sm" onClick={() => logout()}>
              <LogoutIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingOffer;
