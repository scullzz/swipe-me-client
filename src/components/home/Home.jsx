import React, { useEffect, useState, useRef } from "react";
import style from "./style.module.css";
import muted_sound_icon from "./images/muted_sound.svg";
import unmuted_sound_icon from "./images/unmuted_sound.svg";
import avatar from "./images/avatar.svg";
import heart from "./images/like_heart.svg";
import comments from "./images/comments.svg";
import share from "./images/share.svg";
import plus_icon from "./images/plus.svg";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const videosSrc = [
    "/videos/qwe.mp4",
    "/videos/cat.mp4",
    "/videos/cat sys admin.mp4",
    "/videos/saids_defauld_day.mp4",
    "/videos/sunflower.mp4",
    "/videos/movie.m4v",
  ];

  const [sub_video, set_sub_video_src] = useState([]);
  const [new_video, set_new_video_src] = useState([]);

  useEffect(() => {
    set_sub_video_src(videosSrc.slice(0, 3));
    set_new_video_src(videosSrc.slice(3, 5));
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [new_video]);

  const handlePlayPause = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className={style.home_container}>
      <div className={style.video_player_wrapper} onClick={handlePlayPause}>
        <video
          ref={videoRef}
          src={videosSrc[1]}
          autoPlay={true}
          loop={true}
          muted={isMuted}
          controls={false}
          className={style.video_player}
        />
        <div className={style.overlay_top}>
          <button className={style.mute_btn} onClick={handleMute}>
            <img src={isMuted ? muted_sound_icon : unmuted_sound_icon} alt="mute_icon" />
          </button>
          <div className={style.overlay_top_content}>
            <div className={style.overlay_top_content_selection}>
              <button>Подписки</button>
              <button>Новинки</button>
            </div>
          </div>
        </div>
        <div className={style.overlay_right}>
          <div className={style.overlay_right_content}>
            <div className={style.overlay_right_content_part}>
              <button className={style.overlay_right_content_button}>
                <img src={avatar} alt="avatar" />
              </button>
              <button className={style.overlay_right_avatar_sub_btn}>
                <img src={plus_icon} alt="plus_icon" />
              </button>
            </div>
            <div className={style.right_btns_wrapper}>
              <div className={style.overlay_right_content_part}>
                <button className={style.overlay_right_content_button}>
                  <img src={heart} alt="heart" />
                </button>
                <p>11.2M</p>
              </div>
              <div className={style.overlay_right_content_part}>
                <button className={style.overlay_right_content_button}>
                  <img src={comments} alt="comments" />
                </button>
                <p>11.2M</p>
              </div>
              <div className={style.overlay_right_content_part}>
                <button className={style.overlay_right_content_button}>
                  <img src={share} alt="share" />
                </button>
                <p>11.2M</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
