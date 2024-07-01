"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import style from "../styles/home.module.css";
export default function LogoutBtn() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/logout");
      router.push("/");
    } catch (error) {
      console.log("Failed to logout");
    }
  };
  return (
    <div>
      <button onClick={logout} className={style.logoutBtn}>
        Log Out
      </button>
    </div>
  );
}
