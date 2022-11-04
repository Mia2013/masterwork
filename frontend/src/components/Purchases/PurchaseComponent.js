import { useState, useEffect } from "react";
import Alert from "../Alert";

export default function PurchasesCompnent() {
  const [purchases, setPurchases] = useState([]);
  const [alertMessage, setAlertMessage] = useState({});
  useEffect(() => {
    getData(setAlertMessage, setPurchases);
  }, []);

  async function getData(setAlertMessage, setPurchases) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/purchases`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("cakeWorldToken")}`,
          },
        }
      );
      const result = await response.json();
      if (response.status !== 200) {
        return setAlertMessage({
          className: "alert-danger",
          value: result.message,
        });
      }
      setAlertMessage("");
      return setPurchases(
        result.purchases.sort(
          (a, b) => Date.parse(b.paidDate) - Date.parse(a.paidDate)
        )
      );
    } catch (error) {
      setAlertMessage({
        className: "alert-danger",
        value: "Sajnos szerverhiba történt, kérlek gyere vissza később.",
      });
    }
  }

  return (
    <div className="mt-5 purchases-container">
      {alertMessage.value && (
        <Alert className={alertMessage.className} value={alertMessage.value} />
      )}
      {purchases?.length === 0 && !alertMessage.value ? (
        <div ><h2 className="text-center">Még nem rendeltél semmit.</h2></div>

      ) : (
        <div>
          {purchases?.map((item) => (
            <div key={item._id} className="my-5 p-3 home-cover-rgba">
              <h2>
                Rendelés ideje:{" "}
              </h2>
              <h2>
                {new Date(item.paidDate).toLocaleString()?.slice(0, 13)}
              </h2>

              <h4>Termék neve: {item.productId.name}</h4>
              <h4>
                Ára:{" "}
                {new Intl.NumberFormat("hu-HU", {
                  style: "currency",
                  currency: "HUF",
                  maximumFractionDigits: 0,
                }).format(
                  parseInt(item.productId.price, 10) * parseInt(item.slice, 10)
                )}
              </h4>
              <h4>{item.slice} szeletes torta</h4>
              <h4>Átvehető: {item.receiptDate?.slice(0, 10)}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
