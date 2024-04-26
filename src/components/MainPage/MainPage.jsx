// MainPage.js
import React from "react";
import styles from "./MainPage.module.css";
import image from "../../assets/pocket-notes-svg.png";
import { BiSolidLock } from "react-icons/bi";

function MainPage() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.image}>
          <img src={image} alt="" />
        </div>
        <div className={styles.pocket}>Pocket Notes</div>
        <p>
          <span className={`${styles.oneLine} ${styles.sentenceSpacing}`}>
            Send and receive messages without keeping your phone online.
          </span>
          <br />
          <span className={`${styles.oneLine} ${styles.bold} ${styles.sentenceSpacing}`}>
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </span>
        </p>
      </div>
      <p>
        <BiSolidLock />
        end-to-end encrypted
      </p>
    </div>
  );
}

export default MainPage;
