import { useState, useEffect } from "react";
import Alert from "../Alert";
import { getData } from "../utils";

export default function CartComponent() {
  const [cartItems, setCartItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [disabled, setDisabled] = useState(true);
  const initialValue = 0;

  useEffect(() => {
    getData(setAlertMessage, setCartItems);
  }, []);

  async function handleRemove(cakeId) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/orders/${cakeId}`,
        {
          method: "DELETE",
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
      return getData(setAlertMessage, setCartItems);
    } catch (error) {
      setAlertMessage({
        className: "alert-danger",
        value: "Sajnos szerverhiba történt, kérlek gyere vissza később.",
      });
    }
  }

  async function handleBuy() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/orders`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("cakeWorldToken")}`,
          },
          body: JSON.stringify(receiptDate),
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setCartItems([]);
        return setAlertMessage({
          className: "alert-success",
          value:
            "Sikeres vásárlás! A termék mostantól a rendelések között lesz.",
        });
      } else {
        return setAlertMessage({
          className: "alert-danger",
          value: result.message,
        });
      }
    } catch (error) {
      setAlertMessage({
        className: "alert-danger",
        value: "Sajnos szerverhiba történt, kérlek gyere vissza később.",
      });
    }
  }

  function handleOnChange(e) {
    setReceiptDate({receiptDate: e.target.value});
    setDisabled(false)
  }

  return (
    <div className="cart-container mx-0">
      {alertMessage.value ? (
        <Alert className={alertMessage.className} value={alertMessage.value} />
      ) :
      (cartItems?.length === 0 && !alertMessage.value ? (
        <div ><h2 className="text-center">A kosarad még üres!</h2></div>
      ) : (
        <div>
          <table className="table table-hover text-center table-responsive table-borderless">
            <thead>
              <tr>
                <th>NÉV</th>
                <th>MENNYISÉG (szelet)</th>
                <th>ÁR</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item._id}>
                  <td> {item.productId.name}</td>
                  <td> {item.slice}</td>
                  <td>
                    {" "}
                    {new Intl.NumberFormat("hu-HU", {
                      style: "currency",
                      currency: "HUF",
                      maximumFractionDigits: 0,
                    }).format(
                      parseInt(item.productId.price, 10) *
                        parseInt(item.slice, 10)
                    )}
                  </td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-dark"
                      onClick={() => handleRemove(item._id)}
                    >
                      Termék eltávolítása
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>ÖSSZESEN</td>
                <td>
                  {cartItems
                    ?.map((item) => parseInt(item.slice, 10))
                    .reduce((prev, next) => prev + next, initialValue)}
                </td>
                <td>
                  {new Intl.NumberFormat("hu-HU", {
                    style: "currency",
                    currency: "HUF",
                    maximumFractionDigits: 0,
                  }).format(
                    cartItems
                      ?.map(
                        (item) =>
                          parseInt(item.productId.price, 10) *
                          parseInt(item.slice, 10)
                      )
                      .reduce((prev, next) => prev + next, initialValue)
                  )}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <div className="row g-3 align-items-center w-50 align-middle mx-auto d-flex flex-column justify-content-center">
            <div className="col-auto">
              <label className="form-label" htmlFor="receiptDate">
                {" "}
                Átvétel dátuma
              </label>
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                type="date"
                name="receiptDate"
                onChange={(e) => handleOnChange(e)}
              />
              {disabled &&<p className="mt-3">Amíg nem választod ki az átvétel napját, addig nem tudod megrendelni a tortát</p>}
            </div>
          </div>
          <button
            onClick={() => handleBuy()}
            className="btn btn-danger my-4 mx-auto d-flex justify-content-center mb-5"
          disabled={disabled}
          > 
            Megrendelem
          </button>
        </div>
      ))}
    </div>
  );
}