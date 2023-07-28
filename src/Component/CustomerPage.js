import React, { Suspense } from "react";
import classes from "../css/customerpage.module.css";

import Qrimg from "../asset/qr_pay.png";
import UpcomingOffer from "./UpcomingOffer";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { io } from "socket.io-client";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function CustomerPage(props) {
  const [tableData, setTableData] = useState([]);
  const [dinepaymentRecieved, setdinePaymentRecieved] = useState([]);
  const [paymentIsPaid, setPaymentIsPaid] = useState(false);
  const [qrsrc, setQrSrc] = useState(null);
  const [QrsrcQuickbill, setQrSrcquickbill] = useState("");
  const [quickBill, setQuickBill] = useState([]);
  const [dineinTotalAmount, setDineInTotalAmount] = useState(null);
  const [bharatPayField2, setBharatPayField2] = useState(null);
  const [showResult, setShowResult] = useState(true);
  const [kotupdate, setkoteupdate] = useState("");
  const [kotsaved, setkotsaved] = useState("");
  const [billsettled, setbillSettled] = useState("");
  const [paymentobjtable, setpaymentobjtable] = useState([]);
  const [paymentobjrecieve, setpaymentobjrecieve] = useState([]);
  let payobj = {};
  const socket = io.connect(`http://${props.ipadd}:3000/?token=${props.token}`);
  //console.log(props.ipadd, "from customer display");

  useEffect(() => {
    socket.on("quick-bill-placed", (data) => {
      setQuickBill(data);

      setTableData("");
      setdinePaymentRecieved("");
      //console.log(data, "form quickbill");
      setDineInTotalAmount("");
    });
  }, []);

  useEffect(() => {
    socket.on("kot-saved", (data) => {
      const newdata = JSON.parse(data);

      setkotsaved(newdata);
    });
  }, []);

  

  useEffect(() => {
    socket.on("kot-updated", (data) => {
      let newData = JSON.parse(data);

      setkoteupdate(newData);
      //console.log(newData, "from kot updated");
    });
  }, []);

  useEffect(() => {
    for (let key in payobj) {
      if (key == kotupdate?.table_id ||key == kotsaved?.table_id ) {
        setPaymentIsPaid(false);
      }
    }

    const temp = [...dinepaymentRecieved];
    temp.forEach((item, index) => {
      if (kotupdate?.table_id == item?.order?.table_id || kotsaved?.table_id==item?.order?.table_id) {
        temp.splice(index, 1);
      }
    });
    setdinePaymentRecieved(temp);
  }, [kotupdate,kotsaved]);

  useEffect(() => {
    socket.on("bill-settled", (data) => {
      const newdata = JSON.parse(data);
      setbillSettled(newdata);
      setTableData("");
      setDineInTotalAmount("");

      console.log(newdata, "bill settled");
    });
  }, []);

  useEffect(() => {
    if (
      billsettled?.table_id == dinepaymentRecieved?.order?.table_id?.toString()
    ) {
      setPaymentIsPaid(false);
    }
  }, [billsettled]);

  useEffect(() => {
    socket.on("payment-received", (data) => {
      setdinePaymentRecieved([...dinepaymentRecieved, data]);
      console.log(data, "from pyment recieved");
      // setQrSrc(null);
      // setDineInTotalAmount("");
    });
  }, []);

  //payment1
  // function paymentFunHandler1() {
  //   let data = {
  //     msg: 'Order Payment Received For OrderID="xd7oEIigj5XSXV9668"',
  //     store_id: "81222989115777",
  //     flag: 103,
  //     order: {
  //       store_id: "81222989115777",
  //       custom_bill_number: "SK20220000003",
  //       bill_number: 8,
  //       payment: {
  //         npciTrxnId: "6876840758",
  //         isstaticScan: false,
  //         amount: "3.00",
  //         cust_name: "SONU KUSHWAHA SO RAJU KUSHWAHA",
  //         type: "",
  //         cust_phone: "",
  //         trxn_id: "6876840758",
  //       },
  //       table_id: 67599,
  //       order_id: "xd7oEIigj5XSXV9668",
  //     },
  //     tableIdToSettle: {
  //       table_id: 67599,
  //       table_name: "AC1",
  //     },
  //   };
  //   setdinePaymentRecieved([...dinepaymentRecieved, data]);
  //   console.log(data?.order?.table_id, "form payment recie table id");
  // }
  // function paymentFunHandler2() {
  //   let data = {
  //     msg: 'Order Payment Received For OrderID="xd7oEIigj5XSXV9668"',
  //     store_id: "81222989115777",
  //     flag: 103,
  //     order: {
  //       store_id: "81222989115777",
  //       custom_bill_number: "SK20220000004",
  //       bill_number: 8,
  //       payment: {
  //         npciTrxnId: "6876840758",
  //         isstaticScan: false,
  //         amount: "3.00",
  //         cust_name: "SONU KUSHWAHA SO RAJU KUSHWAHA",
  //         type: "",
  //         cust_phone: "",
  //         trxn_id: "6876840758",
  //       },
  //       table_id: 72567,
  //       order_id: "xd7oEIigj5XSXV9668",
  //     },
  //     tableIdToSettle: {
  //       table_id: 72567,
  //       table_name: "AC1",
  //     },
  //   };
  //   setdinePaymentRecieved([...dinepaymentRecieved, data]);
  //   console.log(data?.order?.table_id, "form payment recie table id");
  // }
  // function paymentFunHandler3() {
  //   let data = {
  //     msg: 'Order Payment Received For OrderID="xd7oEIigj5XSXV9668"',
  //     store_id: "81222989115777",
  //     flag: 103,
  //     order: {
  //       store_id: "81222989115777",
  //       custom_bill_number: "SK20220000005",
  //       bill_number: 8,
  //       payment: {
  //         npciTrxnId: "6876840758",
  //         isstaticScan: false,
  //         amount: "3.00",
  //         cust_name: "SONU KUSHWAHA SO RAJU KUSHWAHA",
  //         type: "",
  //         cust_phone: "",
  //         trxn_id: "6876840758",
  //       },
  //       table_id: 90255,
  //       order_id: "xd7oEIigj5XSXV9668",
  //     },
  //     tableIdToSettle: {
  //       table_id: 90255,
  //       table_name: "AC1",
  //     },
  //   };
  //   setdinePaymentRecieved([...dinepaymentRecieved, data]);
  //   console.log(data?.order?.table_id, "form payment recie table id");
  // }
  // payment end
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
            setTableData(res?.data?.orderdata);

            setBharatPayField2(
              res?.data?.orderdata?.billDetails?.field2?.toString()
            );

            console.log(res.data, "from table-clicked");

            //setdinePaymentRecieved("");

            setQuickBill("");
            setShowResult(!showResult);
          });
      } catch (err) {
        console.log("err:", err);
      }

      setDineInTotalAmount(data.order_total);

      console.log(data, "fromdinetotal");
    });
  }, []);
  console.log(paymentIsPaid, "from customer");
  console.log(dinepaymentRecieved, "dine payment recieved");
  //payment state

  // useEffect(() => {

  // setpaymentobjtable([...paymentobjtable , tableData?.custom_bill_number]);

  // setpaymentobjrecieve([
  //   ...paymentobjrecieve,
  //   dinepaymentRecieved?.order?.custom_bill_number?.toString(),
  // ]);
  //for(let  i of paymentobjrecieve){
  // if(paymentobjrecieve[i]== tableData?.custom_bill_number){
  //   console.log(i,'mohan')
  // }  console.log('raja')
  //}

  // }, [tableData, dinepaymentRecieved]);
  // useEffect(()=>{
  //   for(let i=0;i<paymentobjrecieve.length;i++){
  //     if(paymentobjrecieve[i]== tableData?.custom_bill_number){
  //           setPaymentIsPaid(true);
  //         } else {
  //           setPaymentIsPaid(false);
  //         }
  //         console.log(i,paymentobjrecieve[i])
  // }
  // })

  //right userEffect
  //  useEffect(() => {
  //   console.log(tableData?.custom_bill_number, "tabledatacustome bill numer");
  //   console.log(
  //     dinepaymentRecieved?.order?.custom_bill_number?.toString(),
  //     "payment customer bill number"
  //   );
  //   if (
  //     tableData?.custom_bill_number ==
  //     dinepaymentRecieved?.order?.custom_bill_number?.toString()
  //   ) {
  //     setPaymentIsPaid(true);
  //   } else {
  //     setPaymentIsPaid(false);
  //   }
  // }, [tableData, dinepaymentRecieved]);

  // useEffect(()=>{

  //   console.log(tableData?.custom_bill_number,'from conditon table')
  //  for(let i  of paymentobjrecieve){
  //   console.log( paymentobjrecieve[i],'from condition')
  //   if(tableData?.custom_bill_number==paymentobjrecieve[i])
  //   {
  //        setPaymentIsPaid(true);
  //     } else {
  //           setPaymentIsPaid(false);
  //       }
  // }
  // },[tableData,dinepaymentRecieved])

  // console.log(paymentobjtable, "payment paymentobjtable ");

  //  console.log(paymentobjrecieve, "paymentobjrecieve");

  /* payment end*/

  /*payment obj*/

  for (let i = 0; i < dinepaymentRecieved.length; i++) {
    payobj[dinepaymentRecieved[i]?.order?.table_id] =
      dinepaymentRecieved[i]?.order?.custom_bill_number;
  }
  useEffect(() => {
    for (let key in payobj) {
      if (
        key == tableData?.table_id &&
        payobj[key] == tableData?.custom_bill_number
      ) {
        setPaymentIsPaid(true);
      } else {
        setPaymentIsPaid(false);
      }
    }
  }, [tableData, dinepaymentRecieved]);

  console.log(payobj, "from payobj");

  /* payment obh end */
  useEffect(() => {
    const qrcodegenrateFunction = () => {
      try {
        QRCode.toDataURL(`${bharatPayField2}`).then((res) => {
          if (tableData?.billDetails?.field2) {
            setQrSrc(res);
          }

          setShowResult(false);
        });
      } catch (err) {
        console.log(err);
      }
    };

    qrcodegenrateFunction();
  }, [tableData?.billDetails?.field2]);

  useEffect(() => {
    QRCode.toDataURL(`${quickBill?.Payment_qr?.toString()}`)
      .then((res) => {
        setQrSrcquickbill(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [quickBill]);
  console.log(quickBill, "from customerpage");

  return (
    <div style={{ display: "flex" }}>
      <UpcomingOffer />
      <div className={classes.main}>
        {/* <button onClick={() => paymentFunHandler1()}>1</button>
        <button onClick={() => paymentFunHandler2()}>2</button>
        <button onClick={() => paymentFunHandler3()}>3</button> */}
        <div className={classes.header}>
          <h4>
            BILL NUMBER: {tableData.order_id > 0 ? tableData.order_id : null}
          </h4>
        </div>

        <div className={classes.tablealign}>
          <div className={classes.table}>
            <table className="table table-bordered">
              <thead className={classes.tableheadtext}>
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

              {tableData?.billItems ? (
                <tbody className={classes.tablebody}>
                  {" "}
                  {tableData?.billItems?.map((item) => (
                    <tr
                      key={item.item_id}
                      style={{ fontSize: "1.2vw", color: "#333333 " }}
                    >
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              ) : quickBill?.items ? (
                <tbody className={classes.tablebody}>
                  {quickBill?.items.map((item) => (
                    <tr
                      key={item.id}
                      style={{ fontSize: "1.2vw", color: "#333333 " }}
                    >
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div className={classes.nonitem}>
                  {" "}
                  <p> Please order your favourite food...</p>{" "}
                </div>
              )}
            </table>
          </div>
        </div>
        {paymentIsPaid ? (
          <div className={classes.paymentRecieved}>
            <CheckCircleIcon />
            <h6>Payment Successful!</h6>
            <p>Thank you! Your payment is complete</p>
          </div>
        ) : (dineinTotalAmount && tableData?.billItems) ||
          tableData?.billDetails ||
          quickBill?.order_total ? (
          <div className={classes.footer}>
            <div className={classes.amount}>
              {dineinTotalAmount ? (
                <span>
                  <h3>TOTAL AMOUNT :</h3> <h1>₹{dineinTotalAmount}</h1>
                </span>
              ) : (
                (tableData?.billDetails?.order_total && (
                  <span>
                    <h3>TOTAL AMOUNT :</h3>{" "}
                    <h1>₹{tableData?.billDetails?.order_total}</h1>
                  </span>
                )) ||
                (quickBill?.order_total && (
                  <span>
                    <h3>TOTAL AMOUNT :</h3>
                    <h1>₹{quickBill?.order_total}</h1>{" "}
                  </span>
                ))
              )}
            </div>
            <div className={classes.pay}>
              {(tableData?.billDetails?.order_total == dineinTotalAmount &&
                tableData?.billDetails?.field2 !== null && (
                  <span>
                    {" "}
                    <h6>SCAN TO PAY</h6> <img src={qrsrc} alt="qr" />
                  </span>
                )) ||
                (quickBill?.Payment_qr && (
                  <span>
                    {" "}
                    <h6>SCAN TO PAY</h6> <img src={QrsrcQuickbill} alt="qr" />{" "}
                  </span>
                ))}
            </div>
          </div>
        ) : (
          <p className={classes.footernonitem}>
            Payment Processing. Please wait a moment while we generate your
            payment...
          </p>
        )}
      </div>
    </div>
  );
}

export default CustomerPage;
