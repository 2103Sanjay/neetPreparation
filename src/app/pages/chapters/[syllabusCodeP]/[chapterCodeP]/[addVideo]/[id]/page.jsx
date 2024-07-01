"use client";
import EditVideo from "@/app/components/editVideo"; // Adjust import path as per your project structure
import { useState, useEffect } from "react";
import LogoutBtn from "@/app/components/LogoutBtn";

const getVideoById = async (syllabusCode, chapterCode, id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/chapter/${syllabusCode}/${chapterCode}/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch video");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateVideo = async (syllabusCode, chapterCode, id, updates) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/chapter/${syllabusCode}/${chapterCode}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update video");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function UpdateVideo({ params }) {
  const { syllabusCodeP, chapterCodeP, id } = params;
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const data = await getVideoById(syllabusCodeP, chapterCodeP, id);
        if (!data || !data.video) {
          setError("Failed to fetch video data");
        } else {
          setVideoData(data.video);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [syllabusCodeP, chapterCodeP, id]);

  const handleUpdateVideo = async (updates) => {
    try {
      setLoading(true);
      const updatedData = await updateVideo(
        syllabusCodeP,
        chapterCodeP,
        id,
        updates
      );
      if (!updatedData) {
        setError("Failed to update video");
      } else {
        alert("Video Updated"); // Display alert when video is successfully updated
        setVideoData(updatedData.video);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { video } = videoData;
  const videoSrc = video.src;
  const videoTitle = video.title;
  const thumbnailId =
    video.thumbnails && video.thumbnails.length > 0
      ? video.thumbnails[0].id
      : "";
  const thumbnailSr = video.thumbnails[0].src;
  const chapterN = video.alt;

  return (
    <div>
      <LogoutBtn />
      <EditVideo
        id={id}
        videoSrc={videoSrc}
        videoTitle={videoTitle}
        thumbnailId={thumbnailId}
        syllabusCodeP={syllabusCodeP}
        chapterCodeP={chapterCodeP}
        thumbnailSr={thumbnailSr} // Ensure thumbnailSr is passed down correctly
        chapterN={chapterN}
        onUpdate={handleUpdateVideo} // Pass handleUpdateVideo function down to child component
      />
    </div>
  );
}
