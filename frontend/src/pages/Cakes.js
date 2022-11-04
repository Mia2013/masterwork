import { useState, useEffect } from "react";
import { useLoggedInUserContext } from '../components/LoggedInUserContextProvider';
import Alert from "../components/Alert";
import CakeBox from "../components/Shop/CakeBox";

export default function Cakes() {
  const { loggedInUser } = useLoggedInUserContext();
  const [cakes, setCakes] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  

  async function getData() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/cakes`
      );
      const result = await response.json();
      if (response.status !== 200) {
        return setAlertMessage({
          className: 'alert-danger',
          value: result.message,
        });
      } 
      return setCakes(result.cakes);
    } catch(error) {
      setAlertMessage({
        className: 'alert-danger',
        value: 'Sajnos szerverhiba történt, kérlek gyere vissza később.',
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
      <div className="cakes-container">
        <div className="cakes-cover cover mb-5">
        </div>

      <section id="klasszikus" className="mb-5 mt-5 classic-cake container">
        <h2 className="mb-5"> Torták </h2>
        {!loggedInUser.userId 
        ? 
        <h4 className="mb-5">Rendeléshez kérlek regisztrálj és jelentkezz be!</h4>
        : <h4 className="mb-5">A tortákból minimum 6, maximum 20 szeletes méretben lehet rendelni</h4>
        }
        {alertMessage.value && (
          <Alert
            className={alertMessage.className}
            value={alertMessage.value}
          />
          )}

        <div className="box-container mt-3">
          {cakes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((cake) => (
              <CakeBox 
              key={cake._id}
              id={cake._id}
              name={cake.name} 
              description={cake.description}
              price={cake.price}
              allergenic={cake.allergenic}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
