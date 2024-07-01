"use client";
import Image from "next/image";
import deleteImg from "../../../public/delete.png";
import { useRouter } from "next/navigation";
import style from "../styles/chapterVideos.module.css";
const RemoveBtn = ({ id, sCode, cCode }) => {
  const router = useRouter();
  const removeVideo = async () => {
    const confirmed = confirm("ARE YOU CONFIRM");
    if (confirmed) {
      const res = await fetch(
        `http://localhost:3000/api/chapter/${sCode}/${cCode}?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        window.location.reload();
      }
    }
  };
  return (
    <button onClick={removeVideo} className={style.removebtn}>
      <Image src={deleteImg} className={style.removebtn} />
    </button>
  );
};

export default RemoveBtn;
