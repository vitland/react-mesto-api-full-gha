import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

function Register({ onSignUp }) {

  return (
    <section className="auth auth_register">
      <h2 className="auth__header">Регистрация</h2>
      <AuthForm name={"register"} onSubmit={onSignUp}/>
        <span className="auth__text">
          Уже зарегистрированы? <Link to={'/signin'} className='auth__link opacity'>Войти</Link>
        </span>
    </section>
  );
}

export default Register;
