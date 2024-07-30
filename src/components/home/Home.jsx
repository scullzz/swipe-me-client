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
      <div className={style.video_player_wrapper} /* onClick={handlePlayPause} */>
        <video
          ref={videoRef}
          src={videosSrc[2]}
          autoPlay={true}
          loop={true}
          muted={isMuted}
          controls={false}
          className={style.video_player}
          onClick={handlePlayPause}
        />
        <div className={style.overlay_top}>
          <button className={style.mute_btn} onClick={handleMute}>
            <img src={isMuted ? muted_sound_icon : unmuted_sound_icon} alt="mute_icon" className={style.btn_action_icon} />
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
              <a href="">
                <button className={style.overlay_right_content_button}>
                  <img src={avatar} alt="avatar" className={style.right_avatar} />
                </button>
              </a>
              <button className={style.overlay_right_avatar_sub_btn}>
                <img src={plus_icon} alt="plus_icon" />
              </button>
            </div>
            <div className={style.right_btns_wrapper}>
              <div className={style.overlay_right_content_part}>
                <button className={style.overlay_right_content_button}>
                  <img src={heart} alt="heart" className={style.btn_action_icon} />
                </button>
                <p className={style.overlay_right_content_part_text}>11.2M</p>
              </div>
              <div className={style.overlay_right_content_part}>
                <button className={style.overlay_right_content_button}>
                  <img src={comments} alt="comments" className={style.btn_action_icon} />
                </button>
                <p className={style.overlay_right_content_part_text}>11.2M</p>
              </div>
              <div className={style.overlay_right_content_part}>
                <button className={style.overlay_right_content_button}>
                  <img src={share} alt="share" className={style.btn_action_icon} />
                </button>
                <p className={style.overlay_right_content_part_text}>11.2M</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.overlay_bottom}>
          <div className={style.overlay_bottom_content}>
            <h3 className={style.overlay_video_title}>ХАЙП</h3>
            <div className={style.overlay_description_tags}>
              <p className={style.overlay_description}>Описание валополпролвапроларпрп</p>
              <ul className={style.overlay_tags}>
                <li><a href="">#хештег1</a></li>
                <li><a href="">#хештег2</a></li> 
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
