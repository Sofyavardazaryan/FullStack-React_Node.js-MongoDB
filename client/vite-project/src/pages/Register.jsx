import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("en");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form, {
        withCredentials: true,
      });

      alert(
        lang === "hy"
          ? "Գրանցումը հաջողությամբ կատարվեց"
          : "Registered Successfully",
      );

      setForm({
        name: "",
        email: "",
        password: "",
      });

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || (lang === "hy" ? "Սխալ" : "Error"));
    }
  };

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
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

      <form onSubmit={submitHandler}>
        <h2>{lang === "hy" ? "Գրանցում" : "Register"}</h2>

        <input
          type="text"
          name="name"
          placeholder={lang === "hy" ? "Անուն" : "Name"}
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder={lang === "hy" ? "Էլ. փոստ" : "Email"}
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder={lang === "hy" ? "Գաղտնաբառ" : "Password"}
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{lang === "hy" ? "Գրանցվել" : "Register"}</button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          {lang === "hy" ? "Արդեն ունե՞ք հաշիվ։" : "Already have an account?"}{" "}
          <Link to="/">{lang === "hy" ? "Մուտք" : "Login"}</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
