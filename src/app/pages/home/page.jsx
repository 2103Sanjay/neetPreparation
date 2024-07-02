"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import biologyImage from "../../../../public/biology.jpg";
import physicsImage from "../../../../public/physics.jpg";
import chemistryImage from "../../../../public/chemistry.jpg";
import styles from "../../styles/home.module.css";
import LogoutBtn from "@/app/components/LogoutBtn";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.title}>
      <div>
        <p className={styles.page_title}>
          SELECT THE SUBJECT YOU NEED TO MANAGE
        </p>
        <LogoutBtn />
      </div>
      {loading && <div className={styles.backdrop}></div>}
      {loading && <div className={styles.loader}></div>}

      <div
        className={`${styles.containerHome} ${loading ? styles.blurred : ""}`}
      >
        <div className={styles.subjectContainer}>
          <div className={styles.subjectLink}>
            <Image
              src={physicsImage}
              className={styles.homeImages}
              alt="phyimg"
            />
            <p className={styles.sub_name}>PHYSICS</p>
          </div>
          <div className={styles.class_btn_container}>
            <Link href="/pages/chapters/PHYC11">
              <button
                className={styles.class_btn}
                onClick={handleButtonClick}
                disabled={loading}
              >
                CLASS 11
              </button>
            </Link>
            <Link href="/pages/chapters/PHYC12">
              <button
                className={styles.class_btn}
                onClick={handleButtonClick}
                disabled={loading}
              >
                CLASS 12
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.subjectContainer}>
          <div className={styles.subjectLink}>
            <Image
              src={chemistryImage}
              className={styles.homeImages}
              alt="chemimg"
            />
            <p>CHEMISTRY</p>
          </div>
          <div className={styles.class_btn_container}>
            <Link href="/pages/chapters/CHEC11">
              <button
                className={styles.class_btn}
                onClick={handleButtonClick}
                disabled={loading}
              >
                CLASS 11
              </button>
            </Link>
            <Link href="/pages/chapters/CHEC12">
              <button
                className={styles.class_btn}
                onClick={handleButtonClick}
                disabled={loading}
              >
                CLASS 12
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.subjectContainer}>
          <div className={styles.subjectLink}>
            <Image
              src={biologyImage}
              className={styles.homeImages}
              alt="bioimg"
            />
            <p>BIOLOGY</p>
          </div>
          <div className={styles.class_btn_container}>
            <Link href="/pages/chapters/BIOC11">
              <button
                className={styles.class_btn}
                onClick={handleButtonClick}
                disabled={loading}
              >
                CLASS 11
              </button>
            </Link>
            <Link href="/pages/chapters/BIOC12">
              <button
                className={styles.class_btn}
                onClick={handleButtonClick}
                disabled={loading}
              >
                CLASS 12
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
