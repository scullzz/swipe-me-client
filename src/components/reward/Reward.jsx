import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import prize from "./image/prize.svg";
import dollarfly from "./image/dollarfly.svg";
import finish from "./image/finish.svg";

const Reward = () => {
  const [visible, setVisible] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [linkFollow, setLinkFollow] = useState(0);
  const [finishAll, setFinishAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    const data = tg.initDataUnsafe?.user;

    setUserData(data);
    getIsSubscribed();

    if (isSub === true && linkFollow >= 5) {
      setFinishAll(true);
    }
  }, []);

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
  const [timeLeft, setTimeLeft] = useState(calculateTime());

  const getIsSubscribed = async () => {
    try {
      const response = await fetch(
        "https://swipeapi.paradigmacompany.com/preregistered/me/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID": userData?.id,
          },
        }
      );

      if (response.ok) {
        alert("cool");
        const data = await response.json();
        setIsSub(data?.subscribed);
        setLinkFollow(data?.invited);
      } else {
        alert("fuck");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const saveToBuffer = () => {
    const link = `https://t.me/SwipeeMeBot?start=${userData?.id}`;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    navigator.clipboard.writeText(link);
  };
  useEffect(() => {
    setTimeout(() => {
      setFinalVisible(false);
    }, 3000);
  }, [finalVisible]);

  const OpenTimerAndReward = async () => {
    try {
      setIsOpen(true);
      setFinalVisible(true);

      await fetch(
        "https://swipeapi.paradigmacompany.com/preregistered/rewarded/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Telegram-User-ID": userData?.id,
          },
          body: {
            rewarded: true,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.RewardMainBlock}>
      {visible === true ? (
        <div className={style.notification}>ссылка скопированна</div>
      ) : null}
      {finalVisible === true ? (
        <div className={style.notificationFinal}>успешно зарегистрирован</div>
      ) : null}
      <p>{userData?.id}</p>
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
              <button
                onClick={() =>
                  (window.location.href = "https://t.me/SwipeMeNews")
                }
                className={style.ChallangeButton}
              >
                подписаться
              </button>
            ) : (
              <button className={style.ChallandgeButtonFinish}>
                <img src={finish} alt="#" />
              </button>
            )}
          </div>
          <div className={style.ChallandgeBlock}>
            <span className={style.ChallangeText}>Пригласи 5 друзей</span>
            {linkFollow < 5 ? (
              <button
                onClick={() => saveToBuffer()}
                className={style.ChallangeButton}
              >
                пригласить {linkFollow}/5
              </button>
            ) : (
              <button className={style.ChallandgeButtonFinish}>
                <img src={finish} alt="#" />
              </button>
            )}
          </div>
        </div>
        <div className={style.thirdRewardBlock}>
          <div>
            <p className={style.thirdRewardBlockTitleDate}>Дата окончания</p>
            <p className={style.thirdRewardBlockTitleTime}>
              31 июля 2024 в 23:59
            </p>
          </div>
          <div>
            {isOpen === false ? (
              finishAll === false ? (
                <button className={style.TrueFalseParticipate}>
                  УЧАСТВОВАТЬ
                </button>
              ) : (
                <button
                  onClick={() => {
                    OpenTimerAndReward();
                  }}
                  className={style.FalseParticipate}
                >
                  УЧАСТВОВАТЬ
                </button>
              )
            ) : (
              <button className={style.TrueParticipate}>
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
