import React from "react";
import classes from "../css/customerpage.module.css";

import Qrimg from "../asset/qr_pay.jpg";
import UpcomingOffer from "./UpcomingOffer";
import { useEffect, useState } from "react";
import QRCode from  'qrcode'
import { io } from "socket.io-client";
import axios from "axios";

function CustomerPage(props) {
  const [tableData, setTableData] = useState([]);

  const [qrsrc,setQrSrc] = useState('');
  const socket = io.connect(`http://${props.ipadd}:3000/?token=${props.token}`);

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
          });
      } catch (err) {
        console.log("err:", err);
      }
    });
  }, []);

  console.log(tableData, "from customer page data");
  console.log(props.ipadd)

/************************** */
useEffect(()=>{
QRCode.toDataURL(`${tableData?.billDetails?.field2?.toString()}` 
 
).then((res)=>{ 
  setQrSrc(res)
  console.log(res,'from qrcode')
  console.log('____-')
})
.catch((err)=>{
  console.log(err)
})
},[tableData])

 console.log(String(tableData?.billDetails?.field2)
  ,'from bill etails')

  return (
    <div style={{ display: "flex" }}>
      <UpcomingOffer />
      <div className={classes.main}>
        <div className={classes.header}>
          <h4>BILL NUMBER: {tableData.order_id}</h4>
          {/* <h4>ORDER ID:{tableData.bill_number}</h4> */}
        </div>

        <div  className={classes.tablealign}>
        <div  className={classes.table}>
             <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>QTY</th>
                <th>Amount</th>
              </tr>
            </thead>
            {tableData?.billItems?.map((item) => (
              <tbody key={item.item_id}>
                <tr>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.amount}</td>
                </tr>
              </tbody>
            ))}
          </table>     
         
</div>
        </div>
        <div className={classes.footer}>
          <div className={classes.amount}>
            <h3>TOTAL AMOUNT :</h3>
            <h1>₹{tableData?.billDetails?.order_total}</h1>
          </div>
          <div className={classes.pay}>
            <h6>SCAN TO PAY</h6>
            {tableData?.billDetails?.order_total&&<img src={qrsrc} alt="qr" />}     
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;