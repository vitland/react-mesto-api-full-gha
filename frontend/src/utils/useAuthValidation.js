import { useContext, useState } from 'react';
import { FormValidationContext } from '../contexts/form/FormContext';

const useAuthValidation = (name) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { formErrors, setFormErrors, btnStatus, setBtnStatus } = useContext(
    FormValidationContext
  );

  return {
    email,
    password,
    formErrors,
    btnStatus,
    onChange: (evt) => {
      if (name === 'email') {
        setEmail(evt.target.value);
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          emailErrorMsg: evt.target.validationMessage,
        }));
        setBtnStatus(evt.target.validity.valid && !formErrors.passwordErrorMsg);
      } else {
        setPassword(evt.target.value);
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          passwordErrorMsg: evt.target.validationMessage,
        }));
        setBtnStatus(evt.target.validity.valid && !formErrors.emailErrorMsg);
      }
    },
  };
};

export default useAuthValidation;
