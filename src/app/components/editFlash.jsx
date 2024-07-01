"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "../styles/addflash.module.css";

export default function EditTopicForm({
  id,
  termValue,
  definitionValue,
  syllchapCode,
}) {
  const subCode = syllchapCode.slice(0, 3);
  const syllCode = syllchapCode.slice(0, 6);
  const syllName = syllCode.slice(4);
  const chapCode = syllchapCode.slice(6);
  const router = useRouter();

  const [subjectCode] = useState(subCode);
  const [syllabusCode] = useState(syllCode);
  const [syllabusName] = useState(`Class ${syllName}th`);
  const [chapterCode] = useState(chapCode);
  const [chapterName, setChapterName] = useState("");
  const [sequenceCode, setSequenceCode] = useState(`${chapCode}S`);
  const [newFlashValue, setNewFlashValue] = useState(termValue);
  const [newDefinitionValue, setNewDefinitionValue] = useState(definitionValue);

  useEffect(() => {
    // Fetch chapter data once on component mount
    const fetchChapterName = async () => {
      try {
        const chapRes = await fetch(
          `http://localhost:3000/api/chapter/${syllCode}/${chapCode}`,
          { cache: "no-store" }
        );
        if (!chapRes.ok) {
          throw new Error("Failed to fetch chapter details");
        }
        const chapterData = await chapRes.json();
        const name = chapterData?.video?.[0]?.video?.alt || "";
        setChapterName(name);
      } catch (error) {
        console.error("Error fetching chapter details:", error);
      }
    };

    fetchChapterName();
  }, [syllCode, chapCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update flashcard data
      const flashRes = await fetch(
        `http://localhost:3000/api/flashcard/${syllchapCode}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ newFlashValue, newDefinitionValue }),
        }
      );
      if (!flashRes.ok) {
        throw new Error("Failed to update flashcard");
      }
      alert("FLASH CARD UPDATED SUCCESSFULLY");
      // Navigate back to the flashcards page
      router.push(`../`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="sequenceCode">SEQUENCE CODE</label>
            <input
              type="text"
              id="sequenceCode"
              className={style.input}
              readOnly
              value={sequenceCode}
              onChange={(e) => setSequenceCode(e.target.value)}
            />
          </div>
        </div>
        <div className={style.flashinputContainer}>
          <div className={style.inputContainer}>
            <label htmlFor="newFlashValue">TITLE</label>
            <input
              type="text"
              id="newFlashValue"
              className={style.input}
              value={newFlashValue}
              onChange={(e) => setNewFlashValue(e.target.value)}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="newDefinitionValue">DEFINITION</label>
            <textarea
              id="newDefinitionValue"
              className={style.input_def}
              value={newDefinitionValue}
              onChange={(e) => setNewDefinitionValue(e.target.value)}
            />
          </div>
          <div className={style.btn_container}>
            <button type="submit" className={style.addFlash}>
              SAVE FLASHCARD
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
