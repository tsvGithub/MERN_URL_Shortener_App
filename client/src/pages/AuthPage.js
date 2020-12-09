import React, { useState } from "react";
import { useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    // console.log("Error ", error);
    message(error);
    clearError();
  }, [error, message, clearError]);

  const registerHandler = async () => {
    // debugger;
    // e.preventDefault();

    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      // const response = await fetch("http://example.com/movies.json");
      // const myJson = await response.json();
      // console.log(JSON.stringify(myJson));
      console.log(`34 AuthPage await request 'data': ${data.json()}`);
      // console.log(`34 AuthPage await request 'data': ${data}`);
      console.log(`35 AuthPage await request '...form': ${{ ...form }}`);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(`24 AuthPage form: ${{ form }}`);
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link Shortener</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authentication</span>
            <form method="POST">
              <div className="input-field">
                <input
                  placeholder="Your email"
                  id="email"
                  type="email"
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
                  className="yellow-input"
                  required
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
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
            </form>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }} disabled={loading}>
              Login
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              type="submit"
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
