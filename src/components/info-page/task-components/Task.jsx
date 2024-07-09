import React from 'react'
import style from "./TaskStyle.module.css"
import done_task from  "../images/blue_task.svg"
import closed_arrow from "../images/closed_arrow.svg"

const Task = () => {
  return (
    <div className={style.task}>
      <div className={style.task_main_info}>
        <img src={done_task} alt="done_task" className={style.task_icon_status} />
        <div className={style.title_date_wrapper}>
          <p className={style.task_title}>Name task</p>
          <p className={style.task_date_complete}>14 september 14:06</p> 
        </div>
      </div>
      <div className={style.arrow_status_q_swapper}>
        <p className={style.task_q_year}>Q1 2024</p>
        <button className={style.closed_arrow_btn} onClick={() => {}}>
          <img src={closed_arrow} alt="open_arrow" />
        </button>
      </div>
    </div>
  )
}

export default Task
