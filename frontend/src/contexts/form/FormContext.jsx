import { createContext, useState } from 'react';

export const FormValidationContext = createContext({
  formErrors: null,
  setFormErrors: () => null,
  btnStatus: null,
  setBtnStatus: () => null,
});

function FormContextProvider({ children }) {
  const defaultState = {
    emailErrorMsg: '',
    passwordErrorMsg: '',
    aboutErrorMsg: '',
    nameErrorMsg: '',
    avatarErrorMsg: '',
    placeNameErrorMsg: '',
    placeImgErrorMsg: '',
  };
  const [formErrors, setFormErrors] = useState(defaultState);
  const [btnStatus, setBtnStatus] = useState(false);

  return (
    <FormValidationContext.Provider
      value={{ formErrors, setFormErrors, btnStatus, setBtnStatus }}>
      {children}
    </FormValidationContext.Provider>
  );
}

export default FormContextProvider;
