import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import style from "./style.module.css";
import youtube from "./image/youtube.svg";
import telegram from "./image/telegram.svg";
import pencil from "./image/pencil.svg";
import instagram from "./image/insta.svg";
import dots from "./image/dots.svg";
import qr from "./image/qrcode.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./style.css";

const AboutMe = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  };

  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [firstLetter, setFirstLetter] = useState(null);
  const tg = window.Telegram.WebApp;

  const getUserData = () => {
    const data = tg.initDataUnsafe?.user || {};
    console.log(data);
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
  let res;

  useEffect(() => {
    res = JSON.stringify(userData);
    getUserData();
  }, []);

  // {
  //   userData ? (
  //     <div>
  //       <p>
  //         <strong>Имя:</strong> {userData.first_name}
  //       </p>
  //       <p>
  //         <strong>Фамилия:</strong> {userData.last_name}
  //       </p>
  //       <p>
  //         <strong>Юзернейм:</strong> {userData.username}
  //       </p>
  //       <p>
  //         <strong>ID:</strong> {userData.id}
  //       </p>
  //       {userPhoto && <img src={userPhoto} alt="User Profile" />}
  //     </div>
  //   ) : (
  //     <p>Загрузка данных пользователя...</p>
  //   );
  // }

  const list = [
    {
      image: youtube,
      name: "YouTube",
    },
    {
      image: telegram,
      name: "Telegram",
    },
    {
      image: instagram,
      name: "Instagram",
    },
    {
      image: pencil,
      name: "Изменить",
    },
    {
      image: dots,
      name: "Ещë",
    },
  ];
  const items = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    text: `10, 4k`,
  }));

  return (
    <div className={style.AboutBlockMain}>
      <div className={style.AboutLine}>
        <div className={style.MeBlock}>
          <div className={style.MeAvatar}>
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
          <div className={style.MeDescription}>
            <div className={style.QrCodeBlock}>
              <img src={qr} alt="#" />
            </div>
            <span className={style.MeName}>Scullz</span>
            <span className={style.MeProfileInfo}>
              Short description of the chanel
            </span>

            <div className={style.MeStatsBlock}>
              <div className={style.MeStat}>
                <span className={style.MeStatNumber}>666</span>
                <span className={style.MeStatText}>Views</span>
              </div>
              <div className={style.MeStat}>
                <span className={style.MeStatNumber}>666</span>
                <span className={style.MeStatText}>Subscribers</span>
              </div>
              <div className={style.MeStat}>
                <span className={style.MeStatNumber}>666</span>
                <span className={style.MeStatText}>Likes</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.SocialBlock}>
          <Slider {...settings} className={style.SocialFlexBlock}>
            {list.map((item, index) => (
              <div className={style.SocialInfoBlock} key={index}>
                <img
                  className={style.SocialImage}
                  src={item.image}
                  alt={item.name}
                />
                <span className={style.SocialInfoText}>{item.name}</span>
              </div>
            ))}
          </Slider>
        </div>
        <div className={style.VideoList}>
          <div className={style.VideoBlock}>
            <span>video</span>
            <p>{res}</p>
            <p>{userData._auth}</p>
          </div>
          <div className={style.gridContainer}>
            {items.map((item) => (
              <div className={style.gridItem} key={item.id}>
                <div className={style.gridItemContent}>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
