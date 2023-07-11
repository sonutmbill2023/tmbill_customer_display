import React from "react";
import classes from "../css/customerpage.module.css";

import Qrimg from "../asset/qr_pay.png";
import UpcomingOffer from "./UpcomingOffer";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { io } from "socket.io-client";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function CustomerPage(props) {
  const [tableData, setTableData] = useState([]);
  const [DinepaymentRecieved, setDinePaymentRecieved] = useState([]);
  const [qrsrc, setQrSrc] = useState("");
  const [QrsrcQuickbill , setQrSrcquickbill] = useState("")
const [quickBill ,setQuickBill] = useState([])
const [dineinTotalAmount ,setDineInTotalAmount] = useState([])
const [quickbillitems ,setQuickBillItems] = useState([])
  const socket = io.connect(`http://${props.ipadd}:3000/?token=${props.token}`);
  console.log(props.ipadd, "from customer display");


 

  useEffect(() => {

    socket.on('quick-bill-placed',(data)=>{
       
       setQuickBill(  data )
      // setQuickBillItems(  data )
      setTableData('');
      setDinePaymentRecieved("");
      console.log(data,'form quickbill')
      setDineInTotalAmount("")
    })
  },[]);

   

  useEffect(() => {
    socket.on("kot-saved", (data) => {
      const newdata = JSON.parse(data);
      console.log(newdata);
    });
  }, []);

  useEffect(()=>{
    socket.on("bill-settled",(data)=>{
      setTableData("");
 
    })
  },[])

  useEffect(() => {
    socket.on("payment-received", (data) => {
      setDinePaymentRecieved(data);
    });
  });

  

  useEffect(() => {
    socket.on("table-clicked", async (data) => {
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
            setDinePaymentRecieved("");
             setQuickBill("")
          });
      } catch (err) {
        console.log("err:", err);
      }
      setDineInTotalAmount(data.order_total)
      
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

  useEffect(() => {
    QRCode.toDataURL(`${quickBill?.Payment_qr?.toString()}`)
      .then((res) => {
        setQrSrcquickbill(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [quickBill]);

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
            
              <table className="table table-bordered"  >
                <thead  className={classes.tableheadtext} >
                  <tr  >
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
               
    {  tableData?.billItems ? ( <tbody className={classes.tablebody}> {tableData?.billItems?.map((item) => (
                 
                    <tr key={item.item_id} style={{ fontSize: "1.2vw", color: "#333333 " }}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.amount}</td>
                    </tr>
                  
                ))}</tbody>)  : quickBill?.items  ? ( <tbody  className={classes.tablebody}>
                { quickBill?.items.map((item)=>(
                 
                    <tr  key={item.id}  style={{ fontSize: "1.2vw", color: "#333333 " }}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.amount}</td>
                    </tr>
                  
            ))}</tbody>) : (
              <div className={classes.nonitem}>
                {" "}
              <p> Please order your favourite food...</p> {" "}
              </div>
            )}
              </table>
              
          </div>
        </div>
        {DinepaymentRecieved?.msg ? (
          <div className={classes.paymentRecieved}>
           <CheckCircleIcon/>
            <h6>Payment Successful!</h6>
            <p>Thank you! Your payment is complete</p>
          </div>
        ) :  dineinTotalAmount || quickBill?.order_total ? (
          <div className={classes.footer}>
            <div className={classes.amount}>
              <h3>TOTAL AMOUNT :</h3>
            {  dineinTotalAmount && (<h1>₹{dineinTotalAmount}</h1>
         )  ||  quickBill?.order_total && ( <h1>₹{quickBill?.order_total}</h1> )}  
              
            </div>
            <div className={classes.pay}>
              
              {tableData?.billDetails?.order_total==dineinTotalAmount && (<span> <h6>SCAN TO PAY</h6> <img src={qrsrc} alt="qr" /> </span>) || quickBill?.Payment_qr && (<span> <h6>SCAN TO PAY</h6>  <img src={QrsrcQuickbill} alt="qr" /> </span>)  }
            </div>
          </div>
        ) : (
          <p className={classes.footernonitem}>
            Payment Processing. Please wait a moment while we generate your
            payment...
          </p>
        )}

        {/* {  DinepaymentRecieved?.msg && (<div><h6>Transaction Successful!</h6>
        <p>Thank you for your payment.</p></div>) } */}
      </div>
    </div>
  );
}

export default CustomerPage;
