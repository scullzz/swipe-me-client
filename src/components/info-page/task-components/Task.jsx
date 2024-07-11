import React, { useState } from 'react';
import style from "./TaskStyle.module.css";
import done_task from "../images/blue_task.svg";
import closed_arrow from "../images/closed_arrow.svg";
import open_arrow from "../images/open_arrow.svg";

const Task = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.task_container}>
      <button className={style.task_btn} onClick={handleToggle}>
        <div className={style.task_main_info}>
          <img src={done_task} alt="done_task" className={style.task_icon_status} />
          <div className={style.title_date_wrapper}>
            <p className={style.task_title}>Name task</p>
            <p className={style.task_date_complete}>14 september 14:06</p>
          </div>
        </div>
        <div className={style.arrow_status_q_swapper}>
          <div className={style.one_more_wrapper}>
            <p>Q1</p>
            <p>2024</p>
          </div>
          <img src={isOpen ? open_arrow : closed_arrow} alt="toggle_arrow" />
        </div>
      </button>
      {isOpen && (
        <div className={style.task_description}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem alias unde asperiores, dolores pariatur velit magni natus. Cumque labore consequatur architecto inventore cupiditate amet porro? Minima eveniet facilis soluta! Nemo.</p>
          <p>зшоушошупшкопух зкпукпоу кдпоуд окпдуопд</p>
        </div>
      )}
    </div>
  );
}

export default Task;
