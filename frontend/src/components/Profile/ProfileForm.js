import { useState } from 'react';
import Input from '../Input';
import Alert from '../Alert';
import { useLoggedInUserContext } from '../LoggedInUserContextProvider';
import profileSchema from './profileValidation';
import { getDataFromToken } from '../utils';

function ProfileForm() {
  const [formData, setFormData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const { loggedInUser, setLoggedInUser } = useLoggedInUserContext();
  function validateForm() {
    const result = profileSchema.validate(formData);
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

  function handleOnChange(event) {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  const updateUser = async (formData) => {
     try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/users`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('cakeWorldToken')}`,
          },
          body: JSON.stringify(formData),
        },
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
          value: 'Sikeresen frissítetted a profil adataid.',
        });
        setLoggedInUser(getDataFromToken(result.token));
        localStorage.setItem('cakeWorldToken', result.token);
        setFormData({});
      }
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: 'Sajnos szerverhiba történt, dolgozunk a helyreállításán.',
      });
    }
    }
    
  function handleOnSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      updateUser(formData);
    }
  }

 return (
    <div className="my-5 profile-container">
      <form
        onSubmit={handleOnSubmit}
        noValidate
        className="w-50 align-middle mx-auto d-flex flex-column justify-content-center regform mb-5"
      >
        <h2 className="mt-5 mb-3">Profil szerkesztése</h2>
        <p>Az adatok szerkesztéséhez kérlek mindenképp írd be a jelenlegi jelszavad.</p>
        {alertMessage.value && (
          <Alert
            className={alertMessage.className}
            value={alertMessage.value}
          />
        )}

        <Input
          type="text"
          name="name"
          id="name"
          placeholder={loggedInUser.name}
          label= "Felhasználónév"
          value={formData.name}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-person-fill"
          autoComplete = "off"
        />

        <Input
          type="text"
          name="email"
          id="email"
          placeholder={loggedInUser.email}
          label="Email cím"
          value={formData.email}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-envelope"
          autoComplete = "off"
        />

        <Input
          type="password"
          name="currentPassword"
          id="currentPassword"
          placeholder="Jelszó"
          label="Jelszó"
          value={formData.currentPassword}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-asterisk icon-red"
          autoComplete = "off"
          span= "*"
        />

        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Új jelszó"
          label="Új jelszó"
          value={formData.password}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-asterisk"
          autoComplete = "off"
        />

        <Input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="Új jelszó újra"
          label="Új jelszó újra"
          value={formData.passwordConfirm}
          onChange={(e) => handleOnChange(e)}
          iconClass="bi bi-asterisk"
          autoComplete = "off"

        />

        <button
          type="submit"
          className="btn btn-danger mt-2 mb-2 mx-auto"
        >
          Küldés
        </button>

        <p>A <span style={{color: "red"}}>*</span>-al jelölt mező kitöltése kötelező.</p>
      </form>
    </div>
  );
}

export default ProfileForm;