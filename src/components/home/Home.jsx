import React, { useState, useEffect } from "react";
import SwiperCore from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import style from "./style.module.css";
import muted_sound_icon from "./images/muted_sound.svg";
import unmuted_sound_icon from "./images/unmuted_sound.svg";
import avatar from "./images/avatar.svg";
import heart from "./images/like_heart.svg";
import comments from "./images/comments.svg";
import share from "./images/share.svg";
import plus_icon from "./images/plus.svg";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";

SwiperCore.use([Navigation, Pagination, Mousewheel]);

const Home = () => {
  const tg = window.Telegram.WebApp;
  const [isMuted, setIsMuted] = useState(false);
  const [selected, setSelected] = useState('Подписки');
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [activeNewIndex, setActiveNewIndex] = useState(0);

  useEffect(() => {
    setInitData(tg.initData);
  }, [tg]);

  const videosApiSrc = async () => {
    try {
      alert(tg.initDataUnsafe.user.id);
      alert(tg.initData);

      const response = await fetch(
        'https://swipeapi.paradigmacompany.com/videos/random',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Telegram-User-ID': tg.initDataUnsafe.user.id,
            Auth: tg.initData,
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(JSON.stringify(data));
      } else {
        alert(response.status);
      }
    } catch (err) {
      alert('Error fetching data');
    }
  };


  const videosSrc = [
    "/videos/cat.mp4",
    "/videos/cat sys admin.mp4",
    "/videos/saids_defauld_day.mp4",
    "/videos/sunflower.mp4",
    "/videos/qwe.mp4",
    "/videos/brooooo.mp4",
  ];

  const [sub_video, set_sub_video] = useState([]);
  const [new_video, set_new_video] = useState([]);

  useEffect(() => {
    set_sub_video(videosSrc.slice(0, 3));
    set_new_video(videosSrc.slice(3, 6));
    videosApiSrc();
  }, []);

  const handleMute = () => {
    setIsMuted(!isMuted);
    document.querySelectorAll("video").forEach((video) => {
      video.muted = !isMuted;
    });
  };

  const handleSelection = (content) => {
    setSelected(content);
  };

  const handleSlideChange = (swiper) => {
    if (selected === "Подписки") {
      setActiveSubIndex(swiper.activeIndex);
    } else {
      setActiveNewIndex(swiper.activeIndex);
    }
  };

  const handleVideoClick = (e) => {
    const video = e.target;
    if (video.paused) {
      video
        .play()
        .catch((error) => console.error("Video playback failed", error));
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    const activeIndex =
      selected === "Подписки" ? activeSubIndex : activeNewIndex;
    videos.forEach((video, index) => {
      if (index === activeIndex) {
        video.currentTime = 0;
        video
          .play()
          .catch((error) => console.error("Video playback failed", error));
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [selected, activeSubIndex, activeNewIndex]);

  return (
    <div className={style.home_container}>
      <Swiper
        direction="vertical"
        mousewheel={true}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        initialSlide={selected === "Подписки" ? activeSubIndex : activeNewIndex}
        key={selected} // this will force re-render on category change
      >
        {(selected === "Подписки" ? sub_video : new_video).map(
          (videoSrc, index) => (
            <SwiperSlide key={index}>
              <video
                src={videoSrc}
                loop={true}
                muted={isMuted}
                controls={false}
                className={style.video_player}
                onClick={handleVideoClick}
                playsInline
                onLoadedData={(e) => {
                  if (
                    index ===
                    (selected === "Подписки" ? activeSubIndex : activeNewIndex)
                  ) {
                    e.target
                      .play()
                      .catch((error) =>
                        console.error("Video playback failed", error)
                      );
                  }
                }}
              />
              <div className={style.overlay_right}>
                <div className={style.overlay_right_content}>
                  <div className={style.overlay_right_content_part}>
                    <a href="">
                      <button className={style.overlay_right_content_button}>
                        <img
                          src={avatar}
                          alt="avatar"
                          className={style.right_avatar}
                        />
                      </button>
                    </a>
                    <button className={style.overlay_right_avatar_sub_btn}>
                      <img src={plus_icon} alt="plus_icon" />
                    </button>
                  </div>
                  <div className={style.right_btns_wrapper}>
                    <div className={style.overlay_right_content_part}>
                      <button className={style.overlay_right_content_button}>
                        <img
                          src={heart}
                          alt="heart"
                          className={style.btn_action_icon}
                        />
                      </button>
                      <p className={style.overlay_right_content_part_text}>
                        11.2M
                      </p>
                    </div>
                    <div className={style.overlay_right_content_part}>
                      <button className={style.overlay_right_content_button}>
                        <img
                          src={comments}
                          alt="comments"
                          className={style.btn_action_icon}
                        />
                      </button>
                      <p className={style.overlay_right_content_part_text}>
                        11.2M
                      </p>
                    </div>
                    <div className={style.overlay_right_content_part}>
                      <button className={style.overlay_right_content_button}>
                        <img
                          src={share}
                          alt="share"
                          className={style.btn_action_icon}
                        />
                      </button>
                      <p className={style.overlay_right_content_part_text}>
                        11.2M
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.overlay_bottom}>
                <div className={style.overlay_bottom_content}>
                  <h3 className={style.overlay_video_title}>ХАЙП</h3>
                  <div className={style.overlay_description_tags}>
                    <p className={style.overlay_description}>
                      Описание валополпролвапроларпрп
                    </p>
                    <ul className={style.overlay_tags}>
                      <li>
                        <a href="">#хештег1</a>
                      </li>
                      <li>
                        <a href="">#хештег2</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <div className={style.overlay_top}>
        <button className={style.mute_btn} onClick={handleMute}>
          <img
            src={isMuted ? muted_sound_icon : unmuted_sound_icon}
            alt="mute_icon"
            className={style.btn_action_icon}
          />
        </button>
        <div className={style.overlay_top_content}>
          <div className={style.overlay_top_content_selection}>
            <button
              className={`${style.overlay_top_content_selection_button} ${
                selected === "Подписки" ? style.selected : ""
              }`}
              onClick={() => handleSelection("Подписки")}
            >
              Подписки
            </button>
            <button
              className={`${style.overlay_top_content_selection_button} ${
                selected === "Новинки" ? style.selected : ""
              }`}
              onClick={() => handleSelection("Новинки")}
            >
              Новинки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
