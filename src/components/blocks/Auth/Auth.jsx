import React from "react";
import { MainStyles, AuthStyles, InputStyles } from "./styled";

function Auth({
  admin,
  password,
  setPassword,
  email,
  setEmail,
  message,
  handleSubmit,
  loading,
}) {
  return (
    <MainStyles>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <AuthStyles>
            <h2>Sign in</h2>
            <label>E-mail</label>
            <InputStyles
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required
            />
            <label>Password</label>
            <InputStyles
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn btn-warning">Login</button>

            <p>{message}</p>
          </AuthStyles>
        </form>
      </div>
    </MainStyles>
  );
}

export default Auth;
