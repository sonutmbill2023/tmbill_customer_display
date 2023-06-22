import React, { useEffect, useRef, useState } from "react";
import UpcomeOffer from "../asset/upcoming_offer.jpg";
import tmbillimg from "../asset/tmbillimg.jpg";
import classes from "../css/upcomoffer.module.css";
import offer1 from "../asset/offer1.jpg";
import offer2 from "../asset/offer2.jpg";
import "../css/imageUpload.css";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useHistory } from "react-router-dom";
function UpcomingOffer() {
  const history = useHistory();
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const [image3, setImage3] = useState("");
  const [uploadfile, setUploadFile] = useState(false);
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
  }, []);

  console.log(localStorage.getItem("image1"), "form offer page ");

  return (
    <div className={classes.main}>
      <div className={classes.offer}>
        <img src={UpcomeOffer} alt="offer" />
      </div>
      <div className={classes.img}>
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
          <div>
            <div>
              <p>
                Note :{" "}
                <small>
                  You can upload an Image In JPEG, PNG ,GIF format and Fixed
                  Aspect Ratio is 200 X 373.
                </small>
              </p>
            </div>
            <div className={classes.imglabel}>
              <div className="uploadimage">
              <section>Image - 1</section>
                <input id="imgs1" type="file" onChange={imageHandler1} />
                <label htmlFor="imgs1">  Choose File</label>
                <span>
                  {localStorage.getItem("file1")
                    ? localStorage.getItem("file1")
                    : "offer1.jpeg"}
                </span>
              </div>

              <div className="uploadimage">
              <section>Image - 2</section>
                <input id="imgs2" type="file" onChange={imageHandler2} />
              
                <label htmlFor="imgs2">  Choose File</label>
                <span>
                  {localStorage.getItem("file2")
                    ? localStorage.getItem("file2")
                    : "offer2.jpeg"}
                </span>
              </div>

              <div className="uploadimage">
                {/* <label htmlFor="imgs3">Offer3</label> */}
                <section>Image - 3</section>
                <input id="imgs3" type="file" onChange={imageHandler3} />
                <label   htmlFor="imgs3">  Choose File</label>
                <span >
                  {localStorage.getItem("file3")
                    ? localStorage.getItem("file3")
                    : "offer3.jpeg"}
                </span>
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

        <button
          className="btn btn-default btn-sm"
          onClick={() => history.push("/Loginpage")}
        >
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
}

export default UpcomingOffer;
