import React from "react";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Cooperation from "../cooperation/Cooperation";
import trash from "./image/trash.svg";
import { useNavigate } from "react-router-dom";

const RedactProfile = () => {
  const nav = useNavigate();
  const CustomSelect = styled(Select)({
    textAlign: "start",
    height: "36px",
    border: "none",
    borderBottom: "1px solid #626266",
    width: "335px",
    backgroundColor: "#2a2a2a",
    color: "white",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    outline: "none",
    "& .MuiSelect-icon": {
      color: "#333", // Темная стрелка
    },
    "& .MuiSelect-select": {
      padding: "10px",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused": {
      outline: "none",
      border: "none",
      boxShadow: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  });

  const menuProps = {
    PaperProps: {
      style: {
        backgroundColor: "#2a2a2a",
        color: "white",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
      },
    },
  };

  const [firstLetter, setFirstLetter] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [socialLink, setSocialLink] = useState("");
  const tg = window.Telegram.WebApp;

  const handleChange = (event) => {
    setSocialLink(event.target.value);
  };
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

  const PrevPage = () => {
    nav("/about-me");
  };
  const DonePage = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => PrevPage()} className={styles.cancel}>
          Отмена
        </button>
        <button onClick={() => DonePage()} className={styles.done}>
          Готово
        </button>
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
        <label className={styles.TitleBlock}>ОПИСАНИЕ АККАУНТА</label>
        <input type="text" className={styles.input} />
      </div>
      <div className={styles.socialLinks}>
        <label className={styles.TitleBlock}>ССЫЛКИ НА СОЦ. СЕТИ</label>
        <div className={styles.selectContainer}>
          <FormControl fullWidth>
            <CustomSelect
              MenuProps={menuProps}
              displayEmpty
              value={socialLink}
              onChange={handleChange}
              renderValue={
                socialLink !== ""
                  ? undefined
                  : () => (
                      <span style={{ color: "#626266" }}>Выбери соц сеть</span>
                    )
              }
            >
              <MenuItem value="" disabled>
                Выбери соц сеть
              </MenuItem>
              <MenuItem value={"Telegram"}>Telegram</MenuItem>
              <MenuItem value={"Instagram"}>Instagram</MenuItem>
            </CustomSelect>
          </FormControl>
          <input
            type="text"
            className={styles.select2}
            placeholder="URL ссылки"
          />
          <button className={styles.addButton}>Добавить</button>
        </div>
        <p className={styles.explainText}>
          Добавьте до 3 ссылок на социальные сети, которые будут отображаться в
          профиле аккаунта.
        </p>

        <span className={styles.TitleBlock1}>ДОБАВЛЕНИЕ ССЫЛКИ НА СОЦСЕТИ</span>
        <div className={styles.addedLinks}>
          <div className={styles.linkItem}>
            <div className={styles.LinkFlex}>
              <span className={styles.linkFlexSocial}>Telegram</span>
              <span className={styles.linkFlexLink}>https://t.me/cobriktm</span>
            </div>
            <button className={styles.deleteButton}>
              <img src={trash} alt="#" />
            </button>
          </div>
          <div className={styles.linkItem}>
            <div className={styles.LinkFlex}>
              <span className={styles.linkFlexSocial}>Instagram</span>
              <span className={styles.linkFlexLink}>
                https://www.instagram.com/cobriktm/
              </span>
            </div>
            <button className={styles.deleteButton}>
              <img src={trash} alt="#" />
            </button>
          </div>
        </div>
      </div>
      <Cooperation />
    </div>
  );
};

export default RedactProfile;
