import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import prize from "./image/prize.svg";
import dollarfly from "./image/dollarfly.svg";
import finish from "./image/finish.svg";

const Reward = () => {
  const calculateTime = () => {
    try {
      const difference = +new Date("2024-07-31T23:59:00") - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    } catch (err) {
      console.log(err);
    }
  };

  let NumberOfRefs = 0;
  const [isSub, setIsSub] = useState(true);
  const [isLinkFollow, setLinkFollow] = useState(0);
  const [timeLeft, setTimeLeft] = useState(calculateTime());
  const [finishAll, setFinishAll] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={style.RewardMainBlock}>
      <div className={style.RewardLineBlock}>
        <div className={style.FirstRewardBlock}>
          <div className={style.PrizeCircleBackground}>
            <img className={style.PrizeImage} src={prize} alt="#" />
          </div>
          <div className={style.RewardDescriptionBlock}>
            <div className={style.FirstRewardHeader}>
              <img src={dollarfly} alt="#" />
              <span className={style.FirstRewardHeaderText}>
                Розыгрыш 5.000.000 токенов
              </span>
            </div>
            <div className={style.SecondRewardHeaderblock}>
              <p className={style.SecondRewardText}>
                Розыгрыш в честь запуска нашего нового проекта.
              </p>
              <p className={style.SecondRewardText1}>
                <b>Swipe Me</b> - это не просто платформа для просмотра смешных
                видео, это революционный инструмент для блогеров и пользователей
                Telegram.
              </p>
            </div>
          </div>
        </div>
        <div className={style.secondRewardBlock}>
          <div className={style.SecondRewardBlockCompeteBlock}>
            <span className={style.SecondRewardBlockCompeteBlockText}>
              Для участия:
            </span>
          </div>
          <div className={style.ChallandgeBlock}>
            <span className={style.ChallangeText}>Подпишись на наш канал</span>
            {isSub === false ? (
              <button className={style.ChallangeButton}>подписаться</button>
            ) : (
              <button className={style.ChallandgeButtonFinish}>
                <img src={finish} alt="#" />
              </button>
            )}
          </div>
          <div className={style.ChallandgeBlock}>
            <span className={style.ChallangeText}>Пригласи 5 друзей</span>
            <button className={style.ChallangeButton}>
              пригласить {NumberOfRefs}/5
            </button>
          </div>
        </div>
        <div className={style.thirdRewardBlock}>
          <div>
            <p>Дата окончания</p>
            <p>31 июля 2024 в 23:59</p>
          </div>
          <div>
            {finishAll === false ? (
              <button>Участвовать</button>
            ) : (
              <button>
                {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
                {timeLeft.seconds}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
