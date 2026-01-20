import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

type Errors = {
  email?: string;
  password?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0;
  }, [email, password]);

  const validate = () => {
    const next: Errors = {};

    if (!email.trim()) next.email = "Email is required";
    else if (!emailRegex.test(email.trim())) next.email = "Enter a valid email";

    if (!password.trim()) next.password = "Password is required";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    navigate("/users");
  };

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

          <form className="login__form" onSubmit={onSubmit} noValidate>
            <div className="login__field">
              <input
                className={`login__input ${errors.email ? "is-error" : ""}`}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validate}
              />
              {errors.email ? (
                <p className="login__error">{errors.email}</p>
              ) : null}
            </div>

            <div className="login__field login__password">
              <div className="login__passwordRow">
                <input
                  className={`login__input ${errors.password ? "is-error" : ""}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validate}
                />

                <button
                  type="button"
                  className="login__toggle"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              {errors.password ? (
                <p className="login__error">{errors.password}</p>
              ) : null}
            </div>

            <button type="button" className="login__forgot">
              FORGOT PASSWORD?
            </button>

            <button type="submit" className="login__btn" disabled={!canSubmit}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
