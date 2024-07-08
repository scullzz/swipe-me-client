import React from 'react';
import style from "./InfoStyle.module.css";
import logo from "./images/logo.svg";

export function InfoPage() {
    return (
        <div className={style.page_container}>
            <div className={style.info_container}>
                <img src={logo} alt="Logo" className={style.logo} />
                <div className={style.info_description}>
                    <h2 className={style.title}>Swipe Me</h2>
                    <div className={style.description_container}>
                        <p className={style.description}>
                            <strong>Swipe Me</strong> is not just a platform for watching funny videos, it's a <strong>revolutionary tool</strong> for bloggers and Telegram users.
                        </p>
                        <p className={style.description}>
                            <strong>Problem:</strong> Bloggers spend time and effort on promoting their channels, while Telegram users want to see interesting content.
                        </p>
                        <p className={style.description}>
                            <strong>Solution:</strong> Swipe Me pays for views and engagement, motivating users to watch and interact with videos, and provides bloggers with a tool to quickly grow their audience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
