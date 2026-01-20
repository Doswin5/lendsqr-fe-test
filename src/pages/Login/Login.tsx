import { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login">
      <div className="login__left">
        <img className="login__logo" src="/logo.svg" alt="lendsqr" />

        <div className="login__illustrationWrap">
          <img
            className="login__illustration"
            src="/login-illustration.png"
            alt=""
            draggable={false}
          />
        </div>
      </div>

      <div className="login__right">
        <div className="login__card">
          <h1 className="login__title">Welcome!</h1>
          <p className="login__subtitle">Enter details to login.</p>

          <form className="login__form">
            <input className="login__input" type="email" placeholder="Email" />

            <div className="login__password">
              <input
                className="login__input"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                className="login__toggle"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <button type="button" className="login__forgot">
              FORGOT PASSWORD?
            </button>

            <button type="submit" className="login__btn">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
