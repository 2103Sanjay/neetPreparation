"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import style from "../../../../styles/chapterVideos.module.css";
import Image from "next/image";
import edit from "../../../../../../public/edit.png";
import RemoveBtn from "../../../../components/deletebtnvideo";
import closeBtn from ".//../../../../../../public/close.png";
import share from "../../../../../../public/share.png";
import LogoutBtn from "@/app/components/LogoutBtn";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  InstapaperShareButton,
  InstagramIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";

export default function syllabusCode({ params }) {
  const { syllabusCodeP, chapterCodeP } = params;

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareVisible, setShareVisible] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState("COPY");

  const handleShareClick = (url) => {
    setCurrentVideoUrl(url);
    setShareVisible(true);
    setCopyStatus("COPY");
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(currentVideoUrl)
      .then(() => {
        setCopyStatus("COPIED");
        setTimeout(() => setCopyStatus("COPY"), 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const handleCloseShare = () => {
    setShareVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/chapter/${syllabusCodeP}/${chapterCodeP}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setVideos(data.video);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {};
  }, [syllabusCodeP, chapterCodeP]);

  return (
    <div className={style.overallContainer}>
      <LogoutBtn />
      <div className={style.shareContainer}>
        {shareVisible && (
          <div className={style.share}>
            <button onClick={handleCloseShare} className={style.close}>
              <Image src={closeBtn} className={style.shareBtn} />
            </button>
            <div>
              <div>
                <WhatsappShareButton url={currentVideoUrl}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
              <div>
                <InstapaperShareButton url={currentVideoUrl}>
                  <InstagramIcon size={32} round />
                </InstapaperShareButton>
              </div>
              <div>
                <FacebookShareButton url={currentVideoUrl}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
              <div>
                <EmailShareButton url={currentVideoUrl}>
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
            </div>
            <div className={style.url_container}>
              <h2 className={style.videoUrl}>{currentVideoUrl}</h2>
              <button onClick={handleCopyClick} className={style.btn_copy}>
                {copyStatus}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={style.chapters_head}>
        <div>
          <h1>
            Videos for Syllabus Code: {chapterCodeP}
            <span className={style.totalVid_count}>
              (Total Videos :{videos.length})
            </span>
          </h1>
        </div>
        <div className={style.chapter_btnContainer}>
          <Link
            href={`../../../../pages/flashcards/${syllabusCodeP}${chapterCodeP}`}
          >
            <button className={style.chapters_addFlash}>FLASH CARDS</button>
          </Link>
          <Link
            href={`../../../pages/chapters/${syllabusCodeP}/${chapterCodeP}/addvideos`}
          >
            <button className={style.chapters_addVideobtn}>ADD VIDEO</button>
          </Link>
          <Link href={`../../../pages/chapters/${syllabusCodeP}`}>
            <button className={style.chapters_backBtn}>BACK</button>
          </Link>
        </div>
      </div>
      <div className={style.chapterVideoContainer}>
        {loading
          ? Array.from({ length: videos.length }).map((_, index) => (
              <div key={index} className={style.skeleton}>
                <div className={style.skeletonThumbnail}></div>
                <div className={style.skeletonTitle}></div>
              </div>
            ))
          : videos.map((video) => (
              <div key={video._id} className={style.videoContainer}>
                <button
                  className={style.shareBtn}
                  onClick={() => handleShareClick(video.video.src)}
                >
                  <Image src={share} alt="Share" className={style.btn_img} />
                </button>
                <Link href={video.video.src} className={style.videoLink}>
                  <img
                    src={video.video.thumbnails[0].src}
                    alt={`Thumbnail for ${video.video.alt}`}
                    className={style.thumbnail}
                  />

                  <div className={style.videoTitleContainer}>
                    <h3
                      className={style.video_title}
                    >{`${video.video.title.slice(0, 43)}....`}</h3>
                  </div>
                </Link>
                <div className={style.button_container}>
                  <Link
                    href={`../../../../pages/chapters/${syllabusCodeP}/${chapterCodeP}/editVideo/${video._id}`}
                  >
                    <button className={style.editBtn}>
                      <Image src={edit} alt="Share" className={style.btn_img} />
                    </button>
                  </Link>
                  <RemoveBtn
                    id={video._id}
                    sCode={syllabusCodeP}
                    cCode={chapterCodeP}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
