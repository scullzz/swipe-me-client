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
  const tg = window.Telegram.WebApp;

  const [initData, setInitData] = useState(tg.initData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nav = useNavigate();

  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [firstLetter, setFirstLetter] = useState(null);
  const [authData, setAuthData] = useState({});

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  };

  const fetchUserProfilePhoto = async (userId) => {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot<TOKEN>/getUserProfilePhotos?user_id=${userId}`
      );
      const data = await response.json();

      if (data.result?.photos?.length > 0) {
        const fileId = data.result.photos[0][0].file_id;
        const fileResponse = await fetch(
          `https://api.telegram.org/bot<TOKEN>/getFile?file_id=${fileId}`
        );
        const fileData = await fileResponse.json();
        const fileUrl = `https://api.telegram.org/file/bot<TOKEN>/${fileData.result.file_path}`;
        setUserPhoto(fileUrl);
      }
    } catch (error) {
      console.error("Error fetching user profile photo:", error);
    }
  };

  const getUserExtraData = async (userId) => {
    try {
      const response = await fetch(
        "https://swipeapi.paradigmacompany.com/accounts/s",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Telegram-User-ID": userId,
            Auth: initData,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAuthData(data);
      } else {
        console.error("Failed to fetch extra user data");
      }
    } catch (err) {
      console.error("Error fetching extra user data:", err);
    }
  };

  const getSocialMediaList = async (userId) => {
    try {
      const response = await fetch(
        "https://swipeapi.paradigmacompany.com/socialaccount/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID": userId,
            Auth: initData,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data);
      }
      else{
        alert("fuck")
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserData = async () => {
    const data = tg.initDataUnsafe?.user || {};
    console.log("User data:", data);
    setUserData(data);
    if (data.id) {
      fetchUserProfilePhoto(data.id);
      getUserExtraData(data.id);
    }
    if (data.first_name) {
      setFirstLetter(data.first_name.charAt(0));
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

  // const getSocialLinks = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://swipeapi.paradigmacompany.com/socialmedia/",
  //       {
  //         method: "GET",
  //         headers: {
  //           Auth: "M1bCSx92W6",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
