"use client";
import style from "../styles/addvideo.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditVideo({
  id,
  videoSrc,
  videoTitle,
  thumbnailId,
  syllabusCodeP,
  chapterCodeP,
  thumbnailSr,
  chapterN,
  onUpdate,
}) {
  const sub = syllabusCodeP.slice(0, 3);
  const lastIndex = chapterCodeP.lastIndexOf("C");
  const unit = chapterCodeP.slice(0, lastIndex);
  const router = useRouter();

  const [subjectCode] = useState(sub);
  const [unitCode] = useState(unit);
  const [videoAlt, setVideoAlt] = useState(chapterN);
  const [chapterCode] = useState(chapterCodeP);
  const [newVideoSrc, setNewVideoSrc] = useState(videoSrc);
  const [newVideoTitle, setNewVideoTitle] = useState(videoTitle);
  const [newThumbnailId, setNewThumbnailId] = useState(thumbnailId);
  const [thumbnailSrc, setThumbnailSrc] = useState(thumbnailSr); // Initialize thumbnailSrc with prop value

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id.length !== 24) {
      console.error("Invalid video ID");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/chapter/${syllabusCodeP}/${chapterCodeP}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newVideoUrl: newVideoSrc,
            newVideoTitle,
            newThumbnailId,
            newThumbnailUrl: thumbnailSrc, // Include newThumbnailUrl in updates
          }),
        }
      );
      const data = await res.json(); // Await response.json()
      console.log(data);
      if (!res.ok) {
        throw new Error("Failed to update video");
      }
      onUpdate(data.video); // Call onUpdate function with updated video data
      router.push("../");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.backBtnContainer}>
      <div>
        <Link
          href={`../../../../../pages/chapters/${syllabusCodeP}/${chapterCodeP}`}
        >
          <button className={style.btnBack}>BACK</button>
        </Link>
      </div>
      <form className={style.addVideo_container} onSubmit={handleSubmit}>
        <div className={style.videoDiscriptions}>
          <div className={style.codeDetails}>
            <div>
              <label htmlFor="subjectCode">SUBJECT CODE</label>
              <input
                id="subjectCode"
                className={style.input}
                type="text"
                value={subjectCode}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="unitCode">UNIT CODE</label>
              <input
                id="unitCode"
                className={style.input}
                type="text"
                value={unitCode}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="chapterCode">CHAPTER CODE</label>
              <input
                id="chapterCode"
                className={style.input}
                type="text"
                value={chapterCode}
                readOnly
              />
            </div>
          </div>

          <div className={style.videoDetails}>
            <div>
              <label htmlFor="videoAlt">VIDEO ALT</label>
              <input
                id="videoAlt"
                className={style.input}
                type="text"
                readOnly
                value={videoAlt}
                onChange={(e) => setVideoAlt(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="videoSrc">VIDEO URL</label>
              <input
                id="videoSrc"
                className={style.input}
                type="url"
                value={newVideoSrc}
                onChange={(e) => setNewVideoSrc(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="videoTitle">VIDEO TITLE</label>
              <input
                id="videoTitle"
                className={style.input}
                type="text"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
              />
            </div>
          </div>

          <div className={style.thumbnailDetails}>
            <div>
              <label htmlFor="thumbnailSrc">THUMBNAIL URL</label>
              <input
                id="thumbnailSrc"
                className={style.input}
                type="url"
                value={thumbnailSrc}
                onChange={(e) => setThumbnailSrc(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="thumbnailId">THUMBNAIL ID</label>
              <input
                id="thumbnailId"
                className={style.input}
                type="text"
                value={newThumbnailId}
                onChange={(e) => setNewThumbnailId(e.target.value)}
              />
            </div>

            <div className={style.save_video_container}>
              <button type="submit" className={style.addvideo_btn}>
                <span>UPLOAD VIDEO</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
