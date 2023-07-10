import { useContext, useState, useEffect } from 'react';
import Form from "./Form";
import SubmitButton from "./SubmitButton";
import { FormValidationContext } from '../contexts/form/FormContext';


function AuthForm({onSubmit, name}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { formErrors, setFormErrors, btnStatus, setBtnStatus } = useContext(
    FormValidationContext
  );

  useEffect(() => {
    return () => {
      setFormErrors((prevValue)=> ({...prevValue , emailErrorMsg: '', passwordErrorMsg: '' }));
    };
  }, [setFormErrors]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(email, password);
  }
console.log(name)
  return (
    <Form name={name} onSubmit={handleSubmit}>
    <fieldset className="form__set form__set_auth">
      <input
        className={`form__input form__input_dark form__input_email ${
          formErrors.emailErrorMsg ? `form__input_error` : ''
        }`}
        name="email"
        type="email"
        placeholder="Email"
        value={email ?? ''}
        required
        onChange={(evt) => {
          setEmail(evt.target.value);
          setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            emailErrorMsg: evt.target.validationMessage,
          }));
          setBtnStatus(
            evt.target.validity.valid && !formErrors.passwordErrorMsg
          );
        }}
      />
      <span
        className={`form__input-error email-input-error ${
          formErrors.emailErrorMsg ? 'form__input-error_visible' : ''
        }`}>
        {formErrors.emailErrorMsg}
      </span>
      <input
        className={`form__input form__input_dark form__input_password ${
          formErrors.passwordErrorMsg ? `form__input_error` : ''
        }`}
        name="password"
        type="password"
        placeholder="Пароль"
        minLength="2"
        maxLength="200"
        value={password ?? ''}
        required
        onChange={(evt) => {
          setPassword(evt.target.value);
          setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            passwordErrorMsg: evt.target.validationMessage,
          }));
          setBtnStatus(
            evt.target.validity.valid && !formErrors.emailErrorMsg
          );
        }}
      />
      <span
        className={`form__input-error password-input-error ${
          formErrors.passwordErrorMsg ? 'form__input-error_visible' : ''
        }`}>
        {formErrors.passwordErrorMsg}
      </span>
    </fieldset>
    <SubmitButton btnText={`${name === 'register'?'Зарегистрироваться':'Войти'}`} btnStatus={btnStatus} btnReversed={true}/>
  </Form>
  )
}

export default AuthForm