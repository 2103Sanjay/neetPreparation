"use client";
import { useState, useEffect } from "react";
import style from "../../../styles/chapters.module.css";
import Link from "next/link";
import LogoutBtn from "@/app/components/LogoutBtn";
import { useRouter } from "next/navigation";

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
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const router = useRouter();

  const subject = syllabusCodeP.slice(0, 3); // Declare subject and Class here
  const Class = syllabusCodeP.slice(4, 6);

  useEffect(() => {
    const fetchData = async () => {
      await fetchChapters(syllabusCodeP, setChapters, setChapterCodes);
      setLoading(false);
    };

    fetchData();
  }, [syllabusCodeP]);

  const handleChapterClick = (href) => {
    setIsLinkClicked(true);
    router.push(href);
  };

  return (
    <div>
      {isLinkClicked && (
        <div className={style.loadingOverlay}>
          <div className={style.spinner}></div>
        </div>
      )}
      <p className={style.page_title}>SELECT THE CHAPTER YOU NEED TO MANAGE</p>
      <LogoutBtn />
      <div className={style.chapters_head}>
        <p className={style.chapter_detail}>
          {subject} Chapters for Class {Class}
          <sup>th</sup>
        </p>
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
            <a
              onClick={() =>
                handleChapterClick(`${syllabusCodeP}/${chapterCodes[index]}`)
              }
              className={style.link}
              key={index}
            >
              <p className={style.chapters}>
                {index + 1}. {chapter}
              </p>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
