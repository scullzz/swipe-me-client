import React, { useEffect, useState } from "react";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const tg = window.Telegram.WebApp;

  const getUserData = () => {
    const data = tg.initDataUnsafe?.user || {};
    setUserData(data);
    fetchUserProfilePhoto(data.id);
  };

  const fetchUserProfilePhoto = async (userId) => {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot<1682322424:AAEdZRXr0FKSdeqrkG5h4zuHNTZnkuveh_o>/getUserProfilePhotos?user_id=${userId}`
      );
      const data = await response.json();
      if (data.result.photos.length > 0) {
        const fileId = data.result.photos[0][0].file_id;
        const fileResponse = await fetch(
          `https://api.telegram.org/bot<1682322424:AAEdZRXr0FKSdeqrkG5h4zuHNTZnkuveh_o>/getFile?file_id=${fileId}`
        );
        const fileData = await fileResponse.json();
        const fileUrl = `https://api.telegram.org/file/bot<1682322424:AAEdZRXr0FKSdeqrkG5h4zuHNTZnkuveh_o>/${fileData.result.file_path}`;
        setUserPhoto(fileUrl);
      }
    } catch (error) {
      console.error("Error fetching user profile photo:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>Main</h1>
      {userData ? (
        <div>
          <p>
            <strong>Имя:</strong> {userData.first_name}
          </p>
          <p>
            <strong>Фамилия:</strong> {userData.last_name}
          </p>
          <p>
            <strong>Юзернейм:</strong> {userData.username}
          </p>
          <p>
            <strong>ID:</strong> {userData.id}
          </p>
          {userPhoto && <img src={userPhoto} alt="User Profile" />}
        </div>
      ) : (
        <p>Загрузка данных пользователя...</p>
      )}
    </div>
  );
};

export default Main;
