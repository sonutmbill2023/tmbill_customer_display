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
  const [DinepaymentRecieved, setDinePaymentRecieved] = useState([]);
  const [qrsrc, setQrSrc] = useState(QRCode);
  const [QrsrcQuickbill, setQrSrcquickbill] = useState("");
  const [quickBill, setQuickBill] = useState([]);
  const [dineinTotalAmount, setDineInTotalAmount] = useState(null);
  const [bharatPayField2, setBharatPayField2] = useState(null);
  const [showResult, setShowResult] = useState(true);
  const socket = io.connect(`http://${props.ipadd}:3000/?token=${props.token}`);
  console.log(props.ipadd, "from customer display");

  useEffect(() => {
    socket.on("quick-bill-placed", (data) => {
      setQuickBill(data);
      // setQuickBillItems(  data )
      setTableData("");
      setDinePaymentRecieved("");
      console.log(data, "form quickbill");
      setDineInTotalAmount("");
    });
  }, []);

  useEffect(() => {
    socket.on("kot-saved", (data) => {
      const newdata = JSON.parse(data);
      console.log(newdata);
    });
  }, []);

  useEffect(() => {
    socket.on("bill-settled", (data) => {
      setTableData("");
      setDineInTotalAmount("");
      setDinePaymentRecieved("");
    });
  }, []);

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

            setBharatPayField2(
              res?.data?.orderdata?.billDetails?.field2?.toString()
            );

            console.log(res.data, "from table-clicked");
            setDinePaymentRecieved("");

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

  useEffect(() => {
    const qrcodegenrateFunction = () => {
      try {
        QRCode.toDataURL(`${bharatPayField2}`).then((res) => {
          if (tableData?.billDetails?.field2){
            setQrSrc(res);
          } else {
            setQrSrc(Qrimg);
          }

          setShowResult(false);
        });
      } catch (err) {
        // await QRCode.toDataURL(`${tableData?.billDetails?.field2?.toString()}`)
        console.log(err);
      }
    };

    qrcodegenrateFunction();
    console.log(qrsrc);
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
        {DinepaymentRecieved?.msg ? (
          <div className={classes.paymentRecieved}>
            <CheckCircleIcon />
            <h6>Payment Successful!</h6>
            <p>Thank you! Your payment is complete</p>
          </div>
        ) : dineinTotalAmount ||
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
              tableData?.billDetails?.field2 !== null ? (
                <span>
                  {" "}
                  <h6>SCAN TO PAY</h6> <img src={qrsrc} alt="qr" />
                </span>
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1.2vw",
                    textAlign: "center",
                    marginTop: " 12vh",
                    marginLeft: "2vw",
                  }}
                >
                  {" "}
                  Generating QR code...
                </p>
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
