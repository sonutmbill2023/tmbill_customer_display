import React from "react";
import classes from "../css/customerpage.module.css";

import Qrimg from "../asset/qr_pay.png";
import UpcomingOffer from "./UpcomingOffer";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { io } from "socket.io-client";
import axios from "axios";
function CustomerPage(props) {
  const [tableData, setTableData] = useState([]);

  const [qrsrc, setQrSrc] = useState("");
  const socket = io.connect(`http://${props.ipadd}:3000/?token=${props.token}`);
  console.log(props.ipadd, "from customer display");
  useEffect(() => {
    socket.on("kot-saved", (data) => {
      const newdata = JSON.parse(data);
      console.log(newdata);
    });
  }, []);

  useEffect(() => {
    socket.on("table-clicked", async (data) => {
      console.log(data, "from table");
      console.log(data.table_id, "from table");
      try {
        await axios
          .get(
            `http://${props.ipadd}:3000/api/order?table_id=${data.table_id}`,
            {
              headers: {
                Authorization: `Bearer ${props.token}`,
              },
            }
          )
          .then((res) => {
            setTableData(res.data.orderdata);
            console.log(res.data, "from table-clicked");
          });
      } catch (err) {
        console.log("err:", err);
      }
    });
  }, []);

  useEffect(() => {
    QRCode.toDataURL(`${tableData?.billDetails?.field2?.toString()}`)
      .then((res) => {
        setQrSrc(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tableData]);

  return (
    <div style={{ display: "flex" }}>
      <UpcomingOffer />
      <div className={classes.main}>
        <div className={classes.header}>
          <h4>
            BILL NUMBER: {tableData.order_id > 0 ? tableData.order_id : null}
          </h4>
        </div>

        <div className={classes.tablealign}>
          <div className={classes.table}>
       { tableData?.billItems ? (   <table className="table table-bordered">
              <thead>
                <tr>
                  <th
                    style={{
                      fontSize: "1.3vw",
                      color: " #b4b0b0",
                      textAlign: "center",
                    }}
                  >
                    Item Name
                  </th>
                  <th
                    style={{
                      fontSize: "1.3vw",
                      color: "#b4b0b0",
                      textAlign: "center",
                    }}
                  >
                    Qty
                  </th>
                  <th
                    style={{
                      fontSize: "1.3vw",
                      color: "#b4b0b0",
                      textAlign: "center",
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
               {tableData?.billItems ?.map((item) => (
                  <tbody key={item.item_id}>
                 <tr style={{ fontSize: "1.2vw", color: "#333333 " }}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                  </tr>
                </tbody>
              ))}    
            </table> ): <div  className={classes.nonitem}> Please  order your favourite food... </div>}
          </div>
        </div>
      {tableData?.billDetails?.order_total ? (   <div className={classes.footer}>
            <div className={classes.amount}>
            <h3>TOTAL AMOUNT :</h3>
            <h1>₹{tableData?.billDetails?.order_total}</h1>
          </div>
          <div className={classes.pay}>
            <h6>SCAN TO PAY</h6>
            {tableData?.billDetails?.order_total && (
              <img src={qrsrc} alt="qr" />
            )}
          </div>  
        </div> ):<h5 className={classes.footernonitem}>Please generate bill</h5>}
      </div>
    </div>
  );
}

export default CustomerPage;
