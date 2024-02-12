import React from "react";

import "./Avatar.css";
function Avatar() {
  const randomSeed = Math.random().toString();

  const avatarUrl = `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${randomSeed}`;

  return (
    <div className="avatar">
      <img src={avatarUrl} alt="Avatar" />
    </div>
  );
}

export default Avatar;
