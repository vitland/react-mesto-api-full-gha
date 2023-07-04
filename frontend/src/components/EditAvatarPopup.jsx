import { useRef, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { FormValidationContext } from '../contexts/form/FormContext';
import SubmitButton from './SubmitButton';

function EditAvatarPopup({ isOpened, onLoading, onClose, onUpdateAvatar }) {
  const avatarInput = useRef();
  const { formErrors, setFormErrors, btnStatus, setBtnStatus } = useContext(
    FormValidationContext
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarInput.current.value });
    avatarInput.current.value = '';
  }

  useEffect(() => {
    return () => {
      setFormErrors((prevValue)=> ({...prevValue , avatarErrorMsg:'' }));
      setBtnStatus(false);
    };
  }, [isOpened, setFormErrors, setBtnStatus]);

  return (
    <PopupWithForm
      isOpened={isOpened}
      name={'avatar'}
      title={'Обновить аватар'}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="form__set">
        <input
          className={`form__input form__input_type_avatar ${
            formErrors.avatarErrorMsg ? `form__input_error` : ''
          }`}
          name="avatar"
          type="url"
          placeholder="Ссылка на изображение"
          ref={avatarInput}
          onChange={() => {
            setFormErrors({
              avatarErrorMsg: avatarInput.current.validationMessage,
            });
            setBtnStatus(avatarInput.current.validity.valid);
          }}
          required
        />
        <span
          className={`form__input-error avatar-input-error ${
            formErrors.avatarErrorMsg ? 'form__input-error_visible' : ''
          }`}>
          {formErrors.avatarErrorMsg}
        </span>
      </fieldset>
      <SubmitButton
        btnText={`${onLoading ? 'Сохранение...' : 'Сохранить'}`}
        btnStatus={btnStatus}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
