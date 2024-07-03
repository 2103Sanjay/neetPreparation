"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "../../../../styles/addflash.module.css";
import Link from "next/link";
import LogoutBtn from "@/app/components/LogoutBtn";

export default function AddFlashcard({ params }) {
  const { syllchapCode } = params;
  const subCode = syllchapCode.slice(0, 3);
  const syllCode = syllchapCode.slice(0, 6);
  const syllName = syllCode.slice(4);
  const chapCode = syllchapCode.slice(6);
  const router = useRouter();

  const [subjectCode, setSubjectCode] = useState(subCode);
  const [syllabusCode, setSyllabusCode] = useState(syllCode);
  const [syllabusName, setSyllabusName] = useState(`Class ${syllName}th`);
  const [chapterCode, setChapterCode] = useState(chapCode);
  const [chapterName, setChapterName] = useState("");
  const [sequenceCode, setSequenceCode] = useState(`${chapCode}S`);
  const [flashValue, setFlashvalue] = useState("");
  const [definitionValue, setdefinitionValue] = useState("");

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/chapter/${syllCode}/${chapCode}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (data.video && data.video.length > 0) {
          setChapterName(data.video[0].video.alt);
        }
      } catch (error) {
        console.error("Error fetching chapter details:", error);
      }
    };
    fetchFlashcard();
  }, [chapCode, syllCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !subjectCode ||
      !syllabusCode ||
      !syllabusName ||
      !chapterCode ||
      !chapterName ||
      !sequenceCode ||
      !flashValue ||
      !definitionValue
    ) {
      alert("All inputs are required");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/flashcard/${chapCode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            term: [
              {
                value: flashValue,
              },
            ],
            definition: [
              {
                value: definitionValue,
              },
            ],
            tags: {
              subjectCode,
              syllabusCode,
              syllabusName,
              chapterCode,
              chapterName,
              sequenceCode,
            },
          }),
        }
      );
      if (response.ok) {
        router.push(`../../../../pages/flashcards/${syllchapCode}`);
        alert("Flashcard added successfully!");
      } else {
        alert("Failed to add flashcard. Please try again.");
      }
    } catch (error) {
      console.error("Error adding flashcard:", error);
      alert("Failed to add flashcard. Please try again.");
    }
  };

  return (
    <div>
      <h1>
        Add A New Flash Card In Chapter{" "}
        <span className={style.chapterName}>{chapterName}</span>
      </h1>
      <LogoutBtn />
      <div className={style.backbtn_container}>
        <Link href={`../../../../../pages/flashcards/${syllchapCode}`}>
          <button className={style.btnBack}>BACK</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={style.inputOverall}>
          <div className={style.inputcodeContainer}>
            <div className={style.inputContainer}>
              <label htmlFor="subjectCode">SUBJECT CODE</label>
              <input
                type="text"
                id="subjectCode"
                readOnly
                className={style.input}
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
              />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="syllabusCode">SYLLABUS CODE</label>
              <input
                type="text"
                id="syllabusCode"
                readOnly
                className={style.input}
                value={syllabusCode}
                onChange={(e) => setSyllabusCode(e.target.value)}
              />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="syllabusName">SYLLABUS NAME</label>
              <input
                type="text"
                id="syllabusName"
                readOnly
                className={style.input}
                value={syllabusName}
                onChange={(e) => setSyllabusName(e.target.value)}
              />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="chapterCode">CHAPTER CODE</label>
              <input
                type="text"
                id="chapterCode"
                readOnly
                className={style.input}
                value={chapterCode}
                onChange={(e) => setChapterCode(e.target.value)}
              />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="chapterName">CHAPTER NAME</label>
              <input
                type="text"
                id="chapterName"
                readOnly
                className={style.input}
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
              />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="sequenceCode">SEQUENCE CODE</label>
              <input
                type="text"
                id="sequenceCode"
                className={style.input}
                value={sequenceCode}
                onChange={(e) => setSequenceCode(e.target.value)}
              />
            </div>
          </div>
          <div className={style.flashinputContainer}>
            <div className={style.inputContainer}>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                className={style.input}
                value={flashValue}
                onChange={(e) => setFlashvalue(e.target.value)}
              />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="definitionValue">DEFINITION</label>
              <textarea
                type="text"
                id="definitionValue"
                className={style.input_def}
                value={definitionValue}
                onChange={(e) => setdefinitionValue(e.target.value)}
              />
            </div>
            <div className={style.btn_container}>
              <button type="submit" className={style.addFlash}>
                UPLOAD FLASHCARD
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
