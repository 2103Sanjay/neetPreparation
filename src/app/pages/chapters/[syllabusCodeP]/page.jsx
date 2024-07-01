"use client";
import { useState, useEffect } from "react";
import style from "../../../styles/chapters.module.css";
import Link from "next/link";
import LogoutBtn from "@/app/components/LogoutBtn";

async function fetchChapters(syllabusCodeP, setChapters, setChapterCodes) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/chapter/${syllabusCodeP}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const chapterNames = data.tocs.tocItem.map(
      (item) => item.chapter.chapterName
    );
    const chapterCodes = data.tocs.tocItem.map(
      (item) => item.chapter.chapterCode
    );
    setChapters(chapterNames);
    setChapterCodes(chapterCodes);
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }
}

export default function SyllabusCode({ params }) {
  const { syllabusCodeP } = params;
  const [chapters, setChapters] = useState([]);
  const [chapterCodes, setChapterCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchChapters(syllabusCodeP, setChapters, setChapterCodes);
      setLoading(false);
    };

    fetchData();
  }, [syllabusCodeP]);

  return (
    <div>
      <p className={style.page_title}>SELECT THE CHAPTER YOU NEED TO MANAGE</p>
      <LogoutBtn />
      <div className={style.chapters_head}>
        <h3>Chapters for Syllabus Code: {syllabusCodeP}</h3>
        <Link href={"../../../pages/home"}>
          <button className={style.chapters_backBtn}>BACK</button>
        </Link>
      </div>
      <div className={style.chapters_container}>
        {loading ? (
          <div>
            <p className={style.loadingMessage}>
              Fetching your chapters, please hold on for a moment...
            </p>
          </div>
        ) : (
          chapters.map((chapter, index) => (
            <Link
              href={`${syllabusCodeP}/${chapterCodes[index]}`}
              className={style.link}
              key={index}
            >
              <p className={style.chapters}>
                {index + 1}. {chapter}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
