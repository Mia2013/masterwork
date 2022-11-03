import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLoggedInUserContext } from '../LoggedInUserContextProvider';
import { getDataFromToken } from '../utils';
import  loginSchema from './loginValidation';
import Input from '../Input';
import Alert from '../Alert';

export default function LoginForm() {
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({});
  const { setLoggedInUser } = useLoggedInUserContext();
  const navigate = useNavigate();
  
  function handleOnChange(event) {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  function validateForm() {
    const result = loginSchema.validate(formData);
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

  async function handleOnSubmit(event) {
    const formElement = event.target;
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
        const result = await response.json();
        result.status = response.status;
        if (result.status !== 200) {
          setAlertMessage({
            className: 'alert-danger',
            value: result.message,
          });
        } else {
          setAlertMessage({
            className: 'alert-success',
            value: 'Sikeres bejelentkezés.',
          });
          setLoggedInUser(getDataFromToken(result.token));
          localStorage.setItem('cakeWorldToken', result.token);
          setFormData({});
          navigate('/');
          formElement.reset();
        }
      } catch (error) {
        setAlertMessage({
          className: 'alert-danger',
          value: 'Sajnos szerverhiba történt, dolgozunk a helyreállításán.',
        });
      }
    }
  }

  return (
    <div className="login-container">
      <form
        onSubmit={handleOnSubmit}
        noValidate
        className="w-50 align-middle mx-auto d-flex flex-column justify-content-center regform mb-5"
      >
        <h2 className="mt-3 mb-3">Bejelentkezés</h2>
        {alertMessage.value && (
          <Alert
            className={alertMessage.className}
            value={alertMessage.value}
          />
        )}

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

        <button type="submit" className="btn btn-danger mt-2 mb-2 mx-auto">
          Bejelentkezés
        </button>
        <Link to="/regisztracio" className="text-center my-3">Még nem regisztráltál? Kattints ide a regisztrációhoz</Link>

      </form>
    </div>
  );
}
