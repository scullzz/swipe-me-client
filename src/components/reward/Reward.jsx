import React from "react";
import style from "./style.module.css";
import prize from "./image/prize.svg";
import dollarfly from "./image/dollarfly.svg";

const Reward = () => {
  return (
    <div className={style.RewardMainBlock}>
      <div className={style.FirstRewardBlock}>
        <div className={style.PrizeCircleBackground}>
          <img src={prize} alt="#" />
        </div>
        <div>
          <div>
            <img src={dollarfly} alt="#" />
            <span>Розыгрыш 5.000.000 токенов</span>
          </div>
          <div>
            <p>Розыгрыш в честь запуска нашего нового проекта.</p>
            <p>
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
      <div className={style.thirdRewardBlock}></div>
    </div>
  );
};

export default Reward;
