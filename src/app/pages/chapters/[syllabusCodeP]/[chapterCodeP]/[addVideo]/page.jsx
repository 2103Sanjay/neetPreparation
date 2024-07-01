"use client";
import { useState, useEffect } from "react";
import style from "../../../../../styles/addvideo.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutBtn from "@/app/components/LogoutBtn";

export default function AddVideo({ params }) {
  const { syllabusCodeP, chapterCodeP } = params;
  const sub = syllabusCodeP.slice(0, 3);
  const lastIndex = chapterCodeP.lastIndexOf("C");
  const unit = chapterCodeP.slice(0, lastIndex);
  const router = useRouter();

  const [subjectCode, setSubjectCode] = useState(sub);
  const [unitCode, setUnitCode] = useState(unit);
  const [chapterCode, setChapterCode] = useState(chapterCodeP);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoAlt, setVideoAlt] = useState("");
  const [thumbnailId, setThumbnailId] = useState("");
  const [thumbnailSrc, setThumbnailSrc] = useState(
    "https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg"
  );
  let chapterName = [];

  useEffect(() => {
    const fetchChapterDetails = async () => {
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
        const length = data.tocs.tocItem.length;

        for (let i = 0; i < length; i++) {
          chapterName.push(data.tocs.tocItem[i].chapter.chapterName);
        }
        const chapIndex = chapterCodeP.split("C").length - 1;
        const chapterNumber = chapterCodeP.split("C")[chapIndex];
        setVideoAlt(chapterName[chapterNumber - 1]);
      } catch (error) {
        console.error("Error fetching chapter details:", error);
      }
    };

    fetchChapterDetails();
  }, [syllabusCodeP, chapterCodeP]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !subjectCode ||
      !unitCode ||
      !chapterCode ||
      !videoSrc ||
      !videoAlt ||
      !videoTitle ||
      !thumbnailId ||
      !thumbnailSrc
    ) {
      alert("All inputs are required");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/chapter/${syllabusCodeP}/${chapterCodeP}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tags: {
              subjectCode,
              unitCode,
              chapterCode,
            },
            video: {
              src: videoSrc,
              alt: videoAlt,
              title: videoTitle,
              thumbnails: [
                {
                  id: thumbnailId,
                  src: thumbnailSrc,
                },
              ],
            },
          }),
        }
      );

      if (response.ok) {
        router.push(
          `../../../../../pages/chapters/${syllabusCodeP}/${chapterCodeP}`
        );
        alert("Video added successfully!");
      } else {
        alert("Failed to add video. Please try again.");
      }
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video. Please try again.");
    }
  };

  return (
    <div className={style.backBtnContainer}>
      <LogoutBtn />
      <div>
        <Link
          href={`../../../../../pages/chapters/${syllabusCodeP}/${chapterCodeP}`}
        >
          <button className={style.btnBack}>BACK</button>
        </Link>
      </div>
      <form className={style.addVideo_container} onSubmit={handleSubmit}>
        <h1>{chapterName}</h1>
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
                onChange={(e) => setSubjectCode(e.target.value)}
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
                onChange={(e) => setUnitCode(e.target.value)}
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
                onChange={(e) => setChapterCode(e.target.value)}
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
                value={videoAlt}
                readOnly
                onChange={(e) => setVideoAlt(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="videoSrc">VIDEO URL</label>
              <input
                id="videoSrc"
                className={style.input}
                type="url"
                value={videoSrc}
                onChange={(e) => setVideoSrc(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="videoTitle">VIDEO TITLE</label>
              <input
                id="videoTitle"
                className={style.input}
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
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
                value={thumbnailId}
                onChange={(e) => setThumbnailId(e.target.value)}
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
