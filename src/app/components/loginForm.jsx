"use client";
import React, { useState } from "react";
import style from "../../app/styles/login.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!admin.email || !admin.password) {
      alert("ALL INPUTS ARE REQUIRED");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/login",
        admin
      );
      router.push("/pages/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log("LOGIN FAILED");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={style.login_container}>
        <p className={style.page_title}>TUTOR LPT ADMIN</p>
        <h2 className={style.login_title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.div}>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              type="email"
              id="email"
              name="email"
              className={style.input}
            />
          </div>
          <div className={style.div}>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              type="password"
              id="password"
              name="password"
              className={style.input}
            />
          </div>
          {error && <p className={style.error}>{error}</p>}
          <button
            type="submit"
            className={style.btn_login}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
