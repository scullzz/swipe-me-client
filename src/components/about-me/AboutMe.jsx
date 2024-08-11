import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import style from "./style.module.css";
import youtube from "./image/youtube.svg";
import telegram from "./image/telegram.svg";
import pencil from "./image/pencil.svg";
import instagram from "./image/insta.svg";
import dots from "./image/dots.svg";
import qr from "./image/qr.svg";
import qrCode from "./image/qrcode.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Modal from "@mui/material/Modal";
import "./style.css";
import { useNavigate } from "react-router-dom";

const AboutMe = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  };

  const initData = window.Telegram.WebApp.initData;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nav = useNavigate();

  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [firstLetter, setFirstLetter] = useState(null);
  const [authData, setAuthData] = useState({});
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

  const list = [
    {
      image: pencil,
      name: "Изменить",
      index: 4,
    },
    {
      image: dots,
      name: "Ещë",
      index: 5,
    },
  ];
  const items = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    text: `10, 4k`,
  }));

  //test api
  const getTestData = async () => {
    try {
      const response = await fetch(
        "https://swipeapi.paradigmacompany.com/accounts/s",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Telegram-User-ID": userData?.id,
            Auth: initData,
          },
        }
      );
      const data = await response.json();
      setAuthData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTestData();
  }, []);

  const NavigationSliderBlock = (ind) => {
    if (ind === 4) {
      nav("refactor-profile");
    }
  };
  return (
    <div className={style.AboutBlockMain}>
      <p>{userData?.id}</p>
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
            <div onClick={() => handleOpen()} className={style.QrCodeBlock}>
              <img src={qr} alt="#" />
            </div>
            <span className={style.MeName}>{userData?.username}</span>
            <span className={style.MeProfileInfo}>{authData?.description}</span>

            <div className={style.MeStatsBlock}>
              <div className={style.MeStat}>
                <span className={style.MeStatNumber}>
                  {authData?.total_views}
                </span>
                <span className={style.MeStatText}>Views</span>
              </div>
              <div className={style.MeStat}>
                <span className={style.MeStatNumber}>
                  {authData?.subscribers}
                </span>
                <span className={style.MeStatText}>Subscribers</span>
              </div>
              <div className={style.MeStat}>
                <span className={style.MeStatNumber}>
                  {authData?.total_likes}
                </span>
                <span className={style.MeStatText}>Likes</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.SocialBlock}>
          <Slider {...settings} className={style.SocialFlexBlock}>
            {list.map((item, index) => (
              <div
                className={style.SocialInfoBlock}
                key={index}
                onClick={() => NavigationSliderBlock(item.index)}
              >
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={style.ModalBlock}>
            <p className={style.QrText}>QR</p>
            <div className={style.QrCodeBlockImage}>
              <img src={qrCode} alt="#" />
            </div>
            <div className={style.LinkBlock}>
              <p className={style.RefLinkForBot}>t.me/Swipe-Me</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AboutMe;
