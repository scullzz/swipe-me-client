import React, { useState, useEffect, useRef } from "react";
import SwiperCore from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import style from "./style.module.css";
// Импортируйте необходимые изображения и иконки
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
  const [api_videos, setApi_videos] = useState([]);
  const viewedVideos = useRef({}); // Хранит данные о просмотренных видео

  const videosApiSrc = async () => {
    try {
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
        setApi_videos(data);
      } else {
        alert(response.status);
      }
    } catch (err) {
      alert('Error fetching data');
    }
  };

  useEffect(() => {
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
      video.play().catch((error) => console.error("Video playback failed", error));
    } else {
      video.pause();
    }
  };

  const handleVideoTimeUpdate = (videoData) => (e) => {
    const video = e.target;
    const viewedTime = video.currentTime;

    const isViewed = viewedVideos.current[videoData.id];
    const threshold = Math.min(video.duration * 0.1, 1.5); // Минимум 1.5 секунд или 10% от длительности видео

    if (viewedTime >= threshold && !isViewed) {
      viewedVideos.current[videoData.id] = true;

      // Отправка запроса на сервер о просмотре видео
      fetch(`https://swipeapi.paradigmacompany.com/videos/${videoData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Telegram-User-ID': tg.initDataUnsafe.user.id,
          Auth: tg.initData,
        },
        body: JSON.stringify({ viewedTime: video.currentTime })
      }).then(response => {
        if (!response.ok) {
          console.error("Failed to log video view");
        }
      }).catch(error => {
        console.error("Error logging video view:", error);
      });
    }
  };

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    const activeIndex = selected === "Подписки" ? activeSubIndex : activeNewIndex;
    videos.forEach((video, index) => {
      if (index === activeIndex) {
        video.currentTime = 0;
        video.play().catch((error) => console.error("Video playback failed", error));
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
        key={selected} 
      >
        {api_videos.map((videoData, index) => (
          <SwiperSlide key={index}>
            <video
              src={videoData.video}
              loop={true}
              muted={isMuted}
              controls={false}
              className={style.video_player}
              onClick={handleVideoClick}
              onTimeUpdate={handleVideoTimeUpdate(videoData)} // Добавляем обработчик события
              playsInline
              onLoadedData={(e) => {
                if (index === (selected === "Подписки" ? activeSubIndex : activeNewIndex)) {
                  e.target.play().catch((error) =>
                    console.error("Video playback failed", error)
                  );
                }
              }}
            />
            {/* Добавьте необходимый интерфейс для управления и отображения видео */}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={style.overlay_top}>
        <button className={style.mute_btn} onClick={handleMute}>
          <img src={isMuted ? muted_sound_icon : unmuted_sound_icon} alt="mute_icon" className={style.btn_action_icon} />
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
