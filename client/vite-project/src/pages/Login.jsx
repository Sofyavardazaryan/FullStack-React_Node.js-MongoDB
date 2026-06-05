import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("en");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true },
      );

      navigate("/todo");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          (lang === "hy" ? "Մուտքը ձախողվեց" : "Login Failed"),
      );
    }
  };

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      {/* TOP BAR */}
      <div className="top-bar">
        <button
          type="button"
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode
            ? lang === "hy"
              ? "Բաց ռեժիմ"
              : "Light Mode"
            : lang === "hy"
              ? "Մութ ռեժիմ"
              : "Dark Mode"}
        </button>

        <button
          type="button"
          className="theme-btn"
          onClick={() => setLang(lang === "hy" ? "en" : "hy")}
        >
          {lang === "hy" ? "English" : "Հայերեն"}
        </button>
      </div>

      <form onSubmit={loginHandler}>
        <h2>{lang === "hy" ? "Մուտք" : "Login"}</h2>

        <input
          type="email"
          placeholder={lang === "hy" ? "Էլ. փոստ" : "Email"}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder={lang === "hy" ? "Գաղտնաբառ" : "Password"}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {lang === "hy" ? "Մուտք գործել" : "Login"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          {lang === "hy" ? "Չունե՞ք հաշիվ։" : "No account?"}{" "}
          <Link to="/register">{lang === "hy" ? "Գրանցվել" : "Register"}</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
