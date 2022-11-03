import { useState } from "react";
import Input from "../Input";
import Alert from "../Alert";
import { useLoggedInUserContext } from "../LoggedInUserContextProvider";
import contactSchema from "./contactValidation";

export default function ContactForm() {
    const { loggedInUser } = useLoggedInUserContext();
  const [formData, setFormData] = useState({email: loggedInUser.email});
  const [alertMessage, setAlertMessage] = useState("");

  function validateForm() {
    const result = contactSchema.validate(formData);
    const { error } = result;
    if (error) {
      setAlertMessage({
        className: "alert-danger",
        value: result.error.message,
      });
      return false;
    }
    return true;
  }

  function handleOnChange(event) {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  const sendMessage = async (formData) => {
    const url = loggedInUser.email
      ? `${process.env.REACT_APP_BACKEND_URI}/contact`
      : `${process.env.REACT_APP_BACKEND_URI}/contact/${formData.email}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("cakeWorldToken")}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.status !== 200) {
        setAlertMessage({
          className: "alert-danger",
          value: result.message,
        });
      } else {
        setAlertMessage({
          className: "alert-success",
          value: result.message,
        });
        setFormData({});
      }
    } catch (error) {
      setAlertMessage({
        className: "alert-danger",
        value: "Sajnos szerverhiba történt, dolgozunk a helyreállításán.",
      });
    }
  };

  function handleOnSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      sendMessage(formData);
    }
  }

  return (
    <div className="contact-container">
      <form
        onSubmit={handleOnSubmit}
        noValidate
        className="contact-content align-middle mx-auto d-flex flex-column justify-content-center regform mb-5 px-5"
      >
        <h2 className="my-3">Kapcsolat</h2>
        <p>
         Amennyiben egyedi elképzelés alapján szeretnél tortát rendelni, kérlek vedd fel velem a kapcsolatot.
        </p>

        {!loggedInUser.email && (
          <Input
            type="text"
            name="email"
            id="email"
            label="Email cím"
            value={formData.email}
            onChange={(e) => handleOnChange(e)}
            iconClass="bi bi-envelope"
            autoComplete="off"
            span="*"
          />
        )}

        <Input
          type="text"
          name="subject"
          id="subject"
          label="Tárgy"
          span="*"
          value={formData.subject}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-pen"
        />
        <div className="form-group">
          <label htmlFor="textarea" className="my-2">
            Üzenet <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            className="form-control mb-3"
            id="textarea"
            rows="3"
            onChange={(e) => handleOnChange(e)}
            name="message"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-danger mt-2 mb-2 mx-auto">
          Küldés
        </button>

        <p>
          A <span style={{ color: "red" }}>*</span>-al jelölt mező kitöltése
          kötelező.
        </p>

        {alertMessage.value && (
          <Alert
            className={alertMessage.className}
            value={alertMessage.value}
          />
        )}
      </form>
    </div>
  );
}
