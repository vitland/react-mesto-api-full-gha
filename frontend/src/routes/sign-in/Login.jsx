import AuthForm from "../../components/AuthForm";

function Login({ onSignIn }) {
  return (
    <section className="auth auth_login">
      <h2 className="auth__header">Вход</h2>
     <AuthForm name={"login"} onSubmit={onSignIn}/>
    </section>
  );
}

export default Login;
