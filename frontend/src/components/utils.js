import jwt_decode from "jwt-decode";

export const getDataFromToken = (token) => {
  return jwt_decode(token);
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('cakeWorldToken');
  };

  
  export async function getData(setAlertMessage, setCartItems ) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/orders`,
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
      setAlertMessage("")
      return setCartItems(result.orders);
    } catch (error) {
      setAlertMessage({
        className: "alert-danger",
        value: "Sajnos szerverhiba történt, kérlek gyere vissza később.",
      });
    }
  }