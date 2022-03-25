import { IMessage } from "./IMessage";

export enum DefaultAvatar {
  AVATAR_PHOTO = "https://firebasestorage.googleapis.com/v0/b/messanger-react-type-redux.appspot.com/o/defaultPhoto%2FdefaultAvatar.jpg?alt=media&token=67a0b87e-83e5-4730-a4a3-935b482bc41f",
  GROUP__IMAGE = "https://firebasestorage.googleapis.com/v0/b/messanger-react-type-redux.appspot.com/o/defaultPhoto%2FdefaultGroup.png?alt=media&token=ac62faff-d98a-4d78-b274-e130b8481497",
}

export interface IGenericObject {
  [key: string]: any;
}

export const DEFAULT_LAST_MESSAGE: IMessage = {
  text: "__No message",
  urlPhoto: "",
  fromID: "",
  createdAt: new Date(),
  fullname: "",
};
