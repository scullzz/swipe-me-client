import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import home from "./image/home.svg";
import codesandbox from "./image/codesandbox.svg";
import addIcon from "./image/addIcon.svg";
import map from "./image/map.svg";
import user from "./image/user.svg";

import clickedHome from "./image/clickedHome.svg";
import clickedCodesandbox from "./image/clickedCodesandbox.svg";
import clickedMap from "./image/clickedMap.svg";
import clickedUser from "./image/clickedUser.svg";

const Navigation = () => {
  const nav = useNavigate();

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.MainButton.hide();
    tg.disableClosingConfirmation();
    tg.web_app_setup_swipe_behavior({
      allow_vertical_swipe: false,
    });
    tg.onEvent("viewportChanged", () => {
      if (tg.viewportHeight < window.innerHeight) {
        tg.expand();
      }
    });
    tg.onEvent("viewportChanged", () => {
      if (tg.viewportStableHeight < window.innerHeight) {
        tg.expand();
      }
    });
  }, []);
  
  useEffect(() => {
    nav("/home");
  }, []);

  const [homeClickedIcon, setHomeClickIcon] = useState(false);
  const [codesandboxClickedIcon, setCodesandboxClickedIcon] = useState(false);
  const [mapClickedIcon, setMapClickedIcon] = useState(false);
  const [userClickedIcon, setUserClickedIcon] = useState(false);

  const ChangeIconEvent = (e, index) => {
    e.preventDefault();

    setHomeClickIcon(false);
    setCodesandboxClickedIcon(false);
    setMapClickedIcon(false);
    setUserClickedIcon(false);

    switch (index) {
      case 1:
        setHomeClickIcon(true);
        nav("/home");
        break;
      case 2:
        setCodesandboxClickedIcon(true);
        nav("/swapper");
        break;
      case 3:
        setMapClickedIcon(true);
        nav("/info");
        break;
      case 4:
        setUserClickedIcon(true);
        nav("/about-me");
        break;
      default:
        setHomeClickIcon(true);
        nav("/swapper");
    }
  };


  return (
    <div className={style.MainContainer}>
      <div className={style.OutletContainer}>
        <Outlet />
      </div>
      <div className={style.Navigation}>
        <div className={style.Navigation_Limit}>
          <div className={style.Navigation_Flex}>
            <div
              onClick={(e) => ChangeIconEvent(e, 1)}
              className={style.Flex_Item}
            >
              <img
                src={homeClickedIcon === false ? home : clickedHome}
                alt="home"
              />
              <span
                className={
                  homeClickedIcon === false
                    ? style.Navigation_Text
                    : style.Navigation_Text_Clicked
                }
              >
                Home
              </span>
            </div>
            <div
              onClick={(e) => ChangeIconEvent(e, 2)}
              className={style.Flex_Item}
            >
              <img
                src={
                  codesandboxClickedIcon === false
                    ? codesandbox
                    : clickedCodesandbox
                }
                alt="codesandbox"
              />
              <span
                className={
                  codesandboxClickedIcon === false
                    ? style.Navigation_Text
                    : style.Navigation_Text_Clicked
                }
              >
                Swipes
              </span>
            </div>
            <div className={style.Flex_Item}>
              <img src={addIcon} alt="addIcon" />
            </div>
            <div
              onClick={(e) => ChangeIconEvent(e, 3)}
              className={style.Flex_Item}
            >
              <img
                src={mapClickedIcon === false ? map : clickedMap}
                alt="map"
              />
              <span
                className={
                  mapClickedIcon === false
                    ? style.Navigation_Text
                    : style.Navigation_Text_Clicked
                }
              >
                Info
              </span>
            </div>
            <div
              onClick={(e) => ChangeIconEvent(e, 4)}
              className={style.Flex_Item}
            >
              <img
                src={userClickedIcon === false ? user : clickedUser}
                alt="user"
              />
              <span
                className={
                  userClickedIcon === false
                    ? style.Navigation_Text
                    : style.Navigation_Text_Clicked
                }
              >
                Me
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
