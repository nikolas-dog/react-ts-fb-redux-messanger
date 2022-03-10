import React, { FC, useRef, useState } from "react";
import { useActions } from "../../../../../lib/hooks/useActions";
import { useTypedSelector } from "../../../../../lib/hooks/useTypedSelector";
import CustomLoadButtonSend from "../../../../UI/buttons/CustomLoadButtonSend/CustomLoadButtonSend";
import "./mainContentChatForm.scss";

const MainContentChatForm: FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const { setUploadMessege } = useActions();
  const { selectedChat, isMessageLoading } = useTypedSelector(
    (s) => s.chatReducer
  );
  const myProfile = useTypedSelector((s) => s.profileReducer);
  const inputRef = useRef<HTMLInputElement>(null);

  function rewrite(): void {
    setInputText("");
  }

  function handleFocus(): void {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputText(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputText === "") {
      return;
    }
    setUploadMessege(myProfile, inputText, selectedChat, handleFocus, rewrite);
  }
  return (
    <form className="main-content-chat-form" onSubmit={handleSubmit}>
      <button className="main-content-chat-form__clip icon-clip"></button>
      <div className="main-content-chat-form__content">
        <input
          autoFocus={true}
          className="main-content-chat-form__input"
          type="text"
          placeholder="Write a message..."
          value={inputText}
          onChange={handleChange}
          disabled={isMessageLoading}
          ref={inputRef}
        />
        <button className="main-content-chat-form__smile icon-papir-smile"></button>
      </div>
      <CustomLoadButtonSend flag={isMessageLoading} />
    </form>
  );
};
export default MainContentChatForm;