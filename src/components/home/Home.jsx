import React, { useEffect, useState, useRef } from "react";
import style from "./style.module.css";

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
  ];

  const [sub_video, set_sub_video_src] = useState([]);
  const [new_video, set_new_video_src] = useState([]);

  useEffect(() => {
    set_sub_video_src(videosSrc.slice(0, 3));
    set_new_video_src(videosSrc.slice(3, 5));  // исправлено на длину 2
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
      </div>
    </div>
  );
};

export default Home;
