import { IMessage } from "../../../lib/models/IMessage";
import { IUser } from "../../../lib/models/IUser";

export interface IChatState {
  isChatLoading: boolean;
  selectedChat: IUser;
  chatError: string | null;
  myChatList: IUser[];
  messageSnapList: IMessage[];
  messageList: IMessage[];
}

export enum ChatActionEnum {
  SET_SELECTED_CHAT = "SET_SELECTED_CHAT",
  SET_IS_CHAT_LOADING = "SET_IS_CHAT_LOADING",
  SET_CHAT_ERROR = "SET_CHAT_ERROR",
  SET_MY_CHAT_LIST = "SET_MY_CHAT_LIST",
  SET_MESSAGE_SNAP_LIST = "SET_MESSAGE_SNAP_LIST",
  SET_MESSAGE_LIST = "SET_MESSAGE_LIST",
}

export interface SetSelectedChat {
  type: ChatActionEnum.SET_SELECTED_CHAT;
  payload: IUser;
}
export interface SetChatError {
  type: ChatActionEnum.SET_CHAT_ERROR;
  payload: null | string;
}
export interface SetIsChatLoading {
  type: ChatActionEnum.SET_IS_CHAT_LOADING;
  payload: boolean;
}
export interface SetMyChatList {
  type: ChatActionEnum.SET_MY_CHAT_LIST;
  payload: IUser[];
}
export interface SetMessageSnapList {
  type: ChatActionEnum.SET_MESSAGE_SNAP_LIST;
  payload: IMessage[];
}
export interface SetMessageList {
  type: ChatActionEnum.SET_MESSAGE_LIST;
  payload: IMessage[];
}

export type ChatAction =
  | SetSelectedChat
  | SetChatError
  | SetIsChatLoading
  | SetMyChatList
  | SetMessageSnapList
  | SetMessageList;
