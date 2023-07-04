import Form from "./Form";

function PopupWithForm({
  isOpened,
  name,
  title,
  onClose,
  onSubmit,
  children,
}) {

  return (
      <div className={`popup popup_whith-form ${isOpened ? `popup_opened`:``}`}>
        <div className={`popup__container popup__container_type_${name}`}>
          <button
            className="popup__close-icon opacity"
            onClick={onClose}
            type="button"></button>
          <h2 className="popup__heading">{title}</h2>
         <Form onSubmit={onSubmit} >{children}</Form>
        </div>
      </div>
  );
}

export default PopupWithForm;
