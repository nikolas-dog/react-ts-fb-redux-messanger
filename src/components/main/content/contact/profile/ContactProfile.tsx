import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../lib/hooks/useActions";
import { useTypedSelector } from "../../../../../lib/hooks/useTypedSelector";
import { RoutesMainEnum } from "../../../../../lib/utilits/RoutesEnum";
import AvatarRound from "../../../../UI/AvatarCustom/AvatarRound/AvatarRound";
import UserStatus from "../../../../UI/user-status/UserStatus";

const ContactProfile: FC = () => {
  const [isMyContact, setIsMyContact] = useState<boolean | null>(null);
  const { setAllContact, setDeleteFromMyContact, setSelectedChat } =
    useActions();
  const {
    selectedContact,
    myContact,
    globalContact,
    filteredGlobalContact,
    filteredMyContact,
    usersCollectionList,
  } = useTypedSelector((s) => s.contactReducer);
  const { user } = useTypedSelector((s) => s.profileReducer);
  const navigate = useNavigate();

  function handleClickNavigate() {
    setSelectedChat({
      ...selectedContact,
      lastMessage: {
        text: "",
        fromID: "",
        urlPhoto: "",
        createdAt: { seconds: 0 },
        fullname: "",
      },
    });
    navigate(RoutesMainEnum.CHAT);
  }

  function defineIsMyContact() {
    const arr = myContact.map((it) => it.userID);
    const check = arr.includes(selectedContact.userID);
    setIsMyContact(check);
  }

  function handleClickDelete() {
    setDeleteFromMyContact(
      selectedContact,
      user.userID,
      myContact,
      filteredGlobalContact
    );
  }

  function handleClickAdd() {
    setAllContact(
      selectedContact,
      user.userID,
      myContact,
      globalContact,
      filteredMyContact,
      filteredGlobalContact
    );
    setIsMyContact(true);
  }

  useEffect(() => {
    defineIsMyContact();
  }, [selectedContact]);

  return (
    <div className="main-contact-content__profile contact-profile">
      <div className="contact-profile__avatar">
        <AvatarRound
          urlAvatar={usersCollectionList[selectedContact.userID].urlPhoto}
          width="96px"
          height="96px"
        />
      </div>
      <div className="contact-profile__fullname">
        {usersCollectionList[selectedContact.userID].fullname}
      </div>
      <div className="contact-profile__status">
        <UserStatus
          hover={false}
          flag={usersCollectionList[selectedContact.userID].online}
        />
      </div>
      {isMyContact ? (
        <button className="contact-profile__btn" onClick={handleClickNavigate}>
          Send Message
        </button>
      ) : (
        <button className="contact-profile__btn" onClick={handleClickAdd}>
          Add to friends
        </button>
      )}
      {isMyContact && (
        <div className="contact-profile__nav card-nav">
          <button className="card-nav__row">
            <div className="card-nav__icon icon-bell-mute"></div>
            <div className="card-nav__text">Mute notifications</div>
          </button>
          <button className="card-nav__row" onClick={handleClickDelete}>
            <div className="card-nav__icon icon-body-delete"></div>
            <div className="card-nav__text">Remove from contacts</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactProfile;
