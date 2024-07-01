"use client";
import EditFlashForm from "../../../../../components/editFlash";
import style from "../../../../../styles/addflash.module.css";
import Link from "next/link";
import LogoutBtn from "@/app/components/LogoutBtn";

const getFlashById = async (syllabusCode, id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/flashcard/${syllabusCode}/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Flash");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function UpdateFlash({ params }) {
  const { syllchapCode, id } = params;
  const { flash } = await getFlashById(syllchapCode, id);
  const { term, definition } = flash;
  const termValue = term[0]?.value;
  const definitionValue = definition[0]?.value;

  return (
    <div>
      <h1>EDIT YOUR FLASH CARD</h1>
      <LogoutBtn />
      <div className={style.backbtn_container}>
        <Link href={`../../../../../pages/flashcards/${syllchapCode}`}>
          <button className={style.btnBack}>BACK</button>
        </Link>
      </div>
      <EditFlashForm
        id={id}
        termValue={termValue}
        definitionValue={definitionValue}
        syllchapCode={syllchapCode}
      />
    </div>
  );
}
