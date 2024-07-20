import React from "react";
import style from "./style.module.css";
import prize from "./image/prize.svg";
import dollarfly from "./image/dollarfly.svg";

const Reward = () => {
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
              <span className={style.FirstRewardHeaderText}>Розыгрыш 5.000.000 токенов</span>
            </div>
            <div className={style.SecondRewardHeaderblock}>
              <p className={style.SecondRewardText}>Розыгрыш в честь запуска нашего нового проекта.</p>
              <p className={style.SecondRewardText1}>
                <b>Swipe Me</b> - это не просто платформа для просмотра смешных
                видео, это революционный инструмент для блогеров и пользователей
                Telegram.
              </p>
            </div>
          </div>
        </div>
        <div className={style.secondRewardBlock}>
          <div>
            <span>Для участия:</span>
          </div>
          <div>
            <span>Подпишись на наш канал</span>
            <button>подписаться</button>
          </div>
          <div>
            <span>Пригласи 5 друзей</span>
            <button>пригласить 0/5</button>
          </div>
        </div>
        <div className={style.thirdRewardBlock}>
          <div>
            <p>Дата окончания</p>
            <p>31 июля 2024 в 23:59</p>
          </div>
          <div>
            <button>Участвовать</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
