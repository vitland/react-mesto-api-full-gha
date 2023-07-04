import { useState, useContext, useEffect } from 'react';
import { FormValidationContext } from '../contexts/form/FormContext';

import PopupWithForm from './PopupWithForm';
import SubmitButton from './SubmitButton';

function AddPlacePopup({ isOpened, onLoading, onClose, onSubmit }) {
  const [placeName, setPlaceName] = useState('');
  const [placeImg, setPlaceImg] = useState('');
  const { formErrors, setFormErrors, btnStatus, setBtnStatus } = useContext(
    FormValidationContext
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: placeName,
      link: placeImg,
    });
  }

  useEffect(() => {
    setPlaceImg('');
    setPlaceName('');
    setFormErrors((prevValue) => ({
      ...prevValue,
      placeNameErrorMsg: '',
      placeImgErrorMsg: '',
    }));
    setBtnStatus(false);
  }, [isOpened, setBtnStatus, setFormErrors]);

  return (
    <PopupWithForm
      isOpened={isOpened}
      name={'place'}
      title={'Новое место'}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="form__set">
        <input
          className={`form__input form__input_type_placeName ${
            formErrors.placeNameErrorMsg ? `form__input_error` : ''
          }`}
          name="placeName"
          placeholder="Название места"
          type="text"
          minLength="2"
          maxLength="30"
          required
          value={placeName}
          onChange={(evt) => {
            setPlaceName(evt.target.value);
            setFormErrors((prevFormErrors) => ({
              ...prevFormErrors,
              placeNameErrorMsg: evt.target.validationMessage,
            }));
            // Если данные в текущем инпуте валидны и другом инпуте нет ошибок
            setBtnStatus(
              evt.target.validity.valid && formErrors.placeImgErrorMsg === ''
            );
          }}
        />
        <span
          className={`form__input-error placeName-input-error ${
            formErrors.placeNameErrorMsg ? 'form__input-error_visible' : ''
          }`}>
          {formErrors.placeNameErrorMsg}
        </span>
        <input
          className={`form__input form__input_type_placeImage ${
            formErrors.placeImgErrorMsg ? `form__input_error` : ''
          }`}
          name="placeImage"
          placeholder="Ссылка на изображение"
          type="url"
          required
          value={placeImg}
          onChange={(evt) => {
            setPlaceImg(evt.target.value);
            setFormErrors((prevFormErrors) => ({
              ...prevFormErrors,
              placeImgErrorMsg: evt.target.validationMessage,
            }));
            setBtnStatus(
              evt.target.validity.valid && formErrors.placeNameErrorMsg === ''
            );
          }}
        />
        <span
          className={`form__input-error placeImage-input-error ${
            formErrors.placeImgErrorMsg ? 'form__input-error_visible' : ''
          }`}>
          {formErrors.placeImgErrorMsg}
        </span>
      </fieldset>
      <SubmitButton
        btnText={`${onLoading ? 'Добавление...' : 'Добавить'}`}
        btnStatus={btnStatus}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
