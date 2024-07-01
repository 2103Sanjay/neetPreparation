"use client";
import Link from "next/link";
import style from "../../../styles/flashcard.module.css";
import Image from "next/image";
import RemoveBtn from "@/app/components/deletebtnflashcard";
import edit from "../../.././../../public/edit.png";
import { useState, useEffect } from "react";
import LogoutBtn from "@/app/components/LogoutBtn";
export default function Flashcards({ params }) {
  const { syllchapCode } = params;
  const [flashcards, setFlashcards] = useState([]);
  const [syllabusCode, setSyllabusCode] = useState("");
  const [chapterCode, setChapterCode] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const syllCode = syllchapCode.slice(0, 6);
    const chapCode = syllchapCode.slice(6);

    async function fetchFlashCards(chapCode) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/flashcard/${chapCode}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data.flashcard;
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        return [];
      } finally {
        setLoading(false);
      }
    }

    fetchFlashCards(chapCode)
      .then((flashcards) => {
        setFlashcards(flashcards);
      })
      .catch((error) => console.error("Error fetching flashcards:", error));

    setSyllabusCode(syllCode);
    setChapterCode(chapCode);
  }, [syllchapCode]);

  return (
    <div className={style.body}>
      <LogoutBtn />
      <div className={style.page_title}>
        <h1>
          MANAGE YOUR FLASH CARDS{" "}
          <span className={style.flashCount}>
            (total flashcard : {flashcards.length})
          </span>
        </h1>
        <div className={style.button_container}>
          <Link href={`../../pages/flashcards/${syllchapCode}/addflashcard`}>
            <button className={style.chapters_addVideobtn}>ADD FLASH</button>
          </Link>

          <Link href={`../../pages/chapters/${syllabusCode}/${chapterCode}`}>
            <button className={style.chapters_backBtn}>BACK</button>
          </Link>
        </div>
      </div>
      <div className={style.flashcardContainer}>
        {loading ? (
          <div className={style.loading}>
            <h2>Loading...</h2>
          </div>
        ) : (
          flashcards.map((flashcard, index) => (
            <div key={index} className={style.flashcard}>
              <h2 className={style.h2}> {flashcard.term[0].value}</h2>
              <p className={style.p}> {flashcard.definition[0].value}</p>
              <div className={style.btn_container}>
                <Link
                  href={`../../../pages/flashcards/${syllchapCode}/editFlash/${flashcard._id}`}
                >
                  <Image src={edit} className={style.btn_Img} />
                </Link>
                <RemoveBtn
                  id={flashcard._id}
                  sCode={syllabusCode}
                  cCode={chapterCode}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
