import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";

export const AuthPage = () => {
  const { loading, request } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerHandler = async (e) => {
    // debugger;
    e.preventDefault();
    console.log("Hello!");

    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log(`Data: ${data}`);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link Shortener</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authentication</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Your email"
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
                  className="yellow-input"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Your password"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                  className="yellow-input"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }} disabled={loading}>
              Login
            </button>
            <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
