import React from 'react';

function SubmitButton({ btnStatus, btnText, btnReversed }) {
  return (
    <button
      className={`submit-button opacity ${
        btnReversed
          ? `submit-button_reversed ${
              btnStatus && `submit-button_reversed-active`
            } `
          : `${btnStatus && `submit-button_active`}`
      }`}
      type="submit">
      {btnText}
    </button>
  );
}

export default SubmitButton;
