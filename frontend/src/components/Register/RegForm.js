import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  registerSchema from './registerValidation';
import Input from '../Input';
import Alert from '../Alert';

export default function RegForm() {
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  function handleOnChange(event) {
    const { name, value } = event.target;
    setFormData(formData => ({ 
      ...formData,
      [name]: value  
    }))
  }

  function validateForm() {
    const result = registerSchema.validate(formData);
    const { error } = result;
    if (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: result.error.message,
      });
      return false;
    }
    return true;
  }

  function handleOnSubmit(event) {
    const formElement = event.target;
    event.preventDefault();
    if (validateForm()) {
      const url = `${process.env.REACT_APP_BACKEND_URI}/register`;
      const options = {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      fetch(url, options)
        .then((res) => {
          return (res.json());
        })
        .then((data) => {
          if (data.message) {
            setAlertMessage({
              className: 'alert-danger',
              value: data.message,
            });
          } else {
            setAlertMessage({
              className: 'alert-success',
              value: 'Registration successful.',
            });
            navigate('/bejelentkezes');
          }
        })
        .catch(() => {
          setAlertMessage({
            className: 'alert-danger',
            value: "Sajnos szerverhiba történt, dolgozunk a helyreállításán.",
          });
        });
        setFormData({});
        formElement.reset();
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleOnSubmit} noValidate className="w-50 align-middle mx-auto d-flex flex-column justify-content-center regform mb-5">
        <h2 className="mt-3 mb-3">Regisztrációs oldal</h2>
        {((alertMessage.value))
          && (
            <Alert
              className={alertMessage.className}
              value={alertMessage.value}
            />
          )}
        <Input
          type="text"
          name="name"
          id="name"
          label="Felhasználónév"
          value={formData.name}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-person-fill"
        />

        <Input
          type="text"
          name="email"
          id="email"
          label="Email cím"
          value={formData.email}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-envelope"
        />

        <Input
          type="password"
          name="password"
          id="password"
          label="Jelszó"
          value={formData.password}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-asterisk"
        />

        <Input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          label="Jelszó újra"
          value={formData.passwordConfirm}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-asterisk"
        />

        <button type="submit" className="btn btn-danger mt-2 mb-2 mx-auto">Regisztráció</button>
        <Link to="/bejelentkezes" className="text-center mt-3">Van már fiókod? Kattints ide a bejelentkezéshez</Link>
      </form>
    </div>
  );
}