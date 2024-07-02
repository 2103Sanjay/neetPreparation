"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import style from "../styles/home.module.css";

export default function LogoutBtn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await axios.get("http://localhost:3000/api/admin/logout");
      router.push("/");
    } catch (error) {
      console.log("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={logout} className={style.logoutBtn} disabled={loading}>
        {loading ? "Logging out..." : "Log Out"}
      </button>
    </div>
  );
}
