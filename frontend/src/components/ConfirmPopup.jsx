import PopupWithForm from './PopupWithForm';
import SubmitButton from './SubmitButton';

function ConfirmPopup({ isOpened, onLoading, onClose, onRemove, cardId }) {
  return (
    <PopupWithForm
      isOpened={isOpened}
      name={'confirm'}
      title={'Вы уверены?'}
      onClose={onClose}
      onSubmit={(evt) => {
        evt.preventDefault();
        onRemove(cardId);
      }}>
      <SubmitButton
        btnText={`${onLoading ? 'Удаление...' : 'Да'}`}
        btnStatus={true}
      />
    </PopupWithForm>
  );
}

export default ConfirmPopup;
