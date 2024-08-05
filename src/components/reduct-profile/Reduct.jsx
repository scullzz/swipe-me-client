import React from "react";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

const RedactProfile = () => {
  const [firstLetter, setFirstLetter] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const tg = window.Telegram.WebApp;

  const getUserData = () => {
    const data = tg.initDataUnsafe?.user || {};
    setUserData(data);
    if (data.id) {
      fetchUserProfilePhoto(data.id);
    }
    if (data.first_name) {
      setFirstLetter(data.first_name.charAt(0));
    }
  };

  const fetchUserProfilePhoto = async (userId) => {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot1682322424:AAEdZRXr0FKSdeqrkG5h4zuHNTZnkuveh_o/getUserProfilePhotos?user_id=${userId}`
      );
      const data = await response.json();

      if (data.result?.photos?.length > 0) {
        const fileId = data.result.photos[0][0].file_id;
        const fileResponse = await fetch(
          `https://api.telegram.org/bot1682322424:AAEdZRXr0FKSdeqrkG5h4zuHNTZnkuveh_o/getFile?file_id=${fileId}`
        );
        const fileData = await fileResponse.json();
        const fileUrl = `https://api.telegram.org/file/bot1682322424:AAEdZRXr0FKSdeqrkG5h4zuHNTZnkuveh_o/${fileData.result.file_path}`;
        setUserPhoto(fileUrl);
      }
    } catch (error) {
      console.error("Error fetching user profile photo:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.cancel}>Отмена</span>
        <span className={styles.done}>Готово</span>
      </div>
      <div className={styles.MeAvatar}>
        {userPhoto ? (
          <Avatar
            sx={{ width: 94, height: 94, fontSize: 40 }}
            src={userPhoto}
          />
        ) : (
          <Avatar sx={{ width: 94, height: 94, fontSize: 40 }}>
            {firstLetter}
          </Avatar>
        )}
      </div>
      <div className={styles.mainInfo}>
        <label>Описание аккаунта</label>
        <input type="text" className={styles.input} />
      </div>
      <div className={styles.socialLinks}>
        <label>ССЫЛКИ НА СОЦ. СЕТИ</label>
        <div className={styles.selectContainer}>
          <select className={styles.select}>
            <option>Выбрать соц. сеть</option>
            <option>Telegram</option>
            <option>Instagram</option>
          </select>
          <input
            type="text"
            className={styles.select}
            placeholder="URL ссылки"
          />
          <button className={styles.addButton}>Добавить</button>
        </div>
        <p>
          Добавьте до 3 ссылок на социальные сети, которые будут отображаться в
          профиле аккаунта.
        </p>
        <div className={styles.addedLinks}>
          <div className={styles.linkItem}>
            <span>Telegram</span>
            <span>https://t.me/cobriktm</span>
            <button className={styles.deleteButton}>🗑️</button>
          </div>
          <div className={styles.linkItem}>
            <span>Instagram</span>
            <span>https://www.instagram.com/cobriktm/</span>
            <button className={styles.deleteButton}>🗑️</button>
          </div>
        </div>
      </div>
      <div className={styles.cooperation}>
        For cooperation <a href="https://t.me/mavruss">@mavruss</a>
      </div>
    </div>
  );
};

export default RedactProfile;
