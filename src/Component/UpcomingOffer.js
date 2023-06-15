import React, { useEffect, useRef, useState } from "react";
import UpcomeOffer from "../asset/upcoming_offer.jpg";
import tmbillimg from "../asset/tmbillimg.jpg";
import classes from "../css/upcomoffer.module.css";
import offer1 from "../asset/offer1.jpg";
import offer2 from "../asset/offer2.jpg";
import "../css/imageUpload.css";
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from "@mui/icons-material/Settings";
function UpcomingOffer() {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const [image3, setImage3] = useState("");
  const [uploadfile, setUploadFile] = useState(false);
  const imageHandler1 = (e) => {
    setImage1(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
     
  };
  const imageHandler2 = (e) => {
     setImage2(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    
  };
  const imageHandler3 = (e) => {
     setImage3(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    
  };
 
  return (
    <div className={classes.main}>
      <div className={classes.offer}>
        <img src={UpcomeOffer} alt="offer" />
      </div>
      <div className={classes.img}>
        <div>
          {image1 ? (
            <img src={image1} alt="offer1" />
          ) : (
            <img src={offer1} alt="offer1" />
          )}
        </div>
        <div>
          {image2 ? (
            <img src={image2} alt="offer1" />
          ) : (
            <img src={offer2} alt="offer1" />
          )}
        </div>
        <div>
          {image3 ? (
            <img src={image3} alt="offer1" />
          ) : (
            <img src={offer1} alt="offer1" />
          )}
        </div>
      </div>
      {/* <div className={classes.ico}>
        <img src={tmbillimg} alt="ico" /> 
    </div> */}

      {uploadfile && (
        <div className={classes.setting}>
        <div className={classes.settinghead}>
          <h4>Select Offer Images from here...     </h4>
          <button className="btn btn-default" onClick={() => setUploadFile(false)} ><CloseIcon/></button>
          </div>
          <div >
          <div>
            <p>Note : <small>You can upload an Image In JPEG, PNG ,GIF format and Fixed Aspect Ratio is 200 X 373.</small></p>
          </div>
          <div  className={classes.imglabel}  >
            <div className="uploadimage">
              <label htmlFor="imgs1">Offer1</label>
              <input id="imgs1" type="file" onChange={imageHandler1} />
            </div>

            <div className="uploadimage">
              <label htmlFor="imgs2">Offer2</label>
              <input id="imgs2" type="file" onChange={imageHandler2} />
            </div>

            <div className="uploadimage">
              <label htmlFor="imgs3">Offer3</label>
              <input id="imgs3" type="file" onChange={imageHandler3} />
            </div>
            </div>
          </div>
        </div>
      )}

      {/* *************** */}

      <div className="uploadicon">
        <button
          className="btn btn-default btn-sm"
          onClick={() => setUploadFile(!uploadfile)}
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}

export default UpcomingOffer;
