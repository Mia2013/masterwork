import { useState } from "react";
import Alert from "../Alert";
import { useLoggedInUserContext } from "../LoggedInUserContextProvider";

export default function BuyProduct({ id, price }) {
  const { loggedInUser } = useLoggedInUserContext();

  const [alertMessage, setAlertMessage] = useState({});
  const [formData, setFormData] = useState({
    productId: id,
    slice: 6,
  });

  function handleOnClick(e) {
    setAlertMessage("");
    if (
      parseInt(formData.slice, 10) + parseInt(e.target.value, 10) > 20 ||
      parseInt(formData.slice, 10) + parseInt(e.target.value, 10) < 6
    ) {
      return setFormData((prev) => ({
        ...prev,
        slice: formData.slice,
      }));
    }
    return setFormData((prev) => ({
      ...prev,
      slice: parseInt(formData.slice, 10) + parseInt(e.target.value),
    }));
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("cakeWorldToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      result.status = response.status;
      if (result.status !== 200) {
        setAlertMessage({
          className: "alert-danger",
          value: result.message,
        });
      } else {
        setAlertMessage({
          className: "alert-success",
          value: "A termék bekerült a kosárba",
        });
        setFormData({ productId: id, slice: 6 });
      }
    } catch (error) {
      setAlertMessage({
        className: "alert-danger",
        value: "Sajnos szerverhiba történt, a termék nem került be a kosárba",
      });
    }
  }

  return (
    <div>
      <p className="ms-3">1 szelet: {price} Ft</p>
      {loggedInUser.userId && (
        <div>
          <p className="ms-3">
            {formData.slice} szelet: {formData.slice * price} Ft
          </p>
          <form onSubmit={handleOnSubmit}>
            <div>
              <button
                className="btn mx-2"
                type="button"
                onClick={(e) => handleOnClick(e)}
                value="-1"
              >
                -
              </button>
              <h4 className="d-inline">{formData.slice} </h4>
              <button
                className="btn mx-2"
                type="button"
                onClick={(e) => handleOnClick(e)}
                value="1"
              >
                +
              </button>

              <button className="bi bi-cart btn d-inline" type="submit">
                {" "}
                Kosárba teszem
              </button>
            </div>
            {alertMessage.value && (
              <Alert
                className={alertMessage.className}
                value={alertMessage.value}
              />
            )}
          </form>
        </div>
      )}
    </div>
  );
}
