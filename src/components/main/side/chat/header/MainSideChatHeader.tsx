import React, { FC, useState } from "react";
import InputSearch from "../../../../UI/input/InputSearch/InputSearch";

interface MainSideChatHeaderProps {
  seachInput: string;
  setSearchInput: any;
}

const MainSideChatHeader: FC<MainSideChatHeaderProps> = ({
  seachInput,
  setSearchInput,
}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  function clearInput() {
    setSearchInput("");
  }
  return (
    <div className="main-side-chat-header">
      <div className="main-side-chat-header__top chat-side-header-top">
        <div className="chat-side-header-top__title main-24-title">Chats</div>
        <div className="chat-side-header-top__buttons">
          <button className="icon-bell"></button>
          <button className="icon-cross"></button>
        </div>
      </div>
      <div className="main-side-chat-header__search">
        <InputSearch
          inputValue={seachInput}
          handleChange={handleChange}
          handleClick={clearInput}
        />
      </div>
    </div>
  );
};

export default MainSideChatHeader;
