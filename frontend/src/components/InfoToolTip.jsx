import sucsess from '../images/succsess_icon.svg';
import unsucsess from '../images/unsuccsess_icon.svg';

function InfoToolTip({ name, isSuccsess, onClose, isOpened }) {
  const text = isSuccsess
    ? `Вы успешно зарегистрировались!`
    : `Что-то пошло не так!
Попробуйте ещё раз.`;

  return (
    <div className={`popup ${isOpened ? `popup_opened`:``}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className="popup__close-icon opacity"
          onClick={onClose}
          type="button"></button>
        {isSuccsess ? (
          <img src={sucsess} alt="Успешно" className="popup__icon" />
        ) : (
          <img src={unsucsess} alt="Не успешно" className="popup__icon" />
        )}
        <h2 className="popup__heading popup__heading_type_tool-tip">{text}</h2>
      </div>
    </div>
  );
}

export default InfoToolTip;
