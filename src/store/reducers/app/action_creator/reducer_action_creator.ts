import {
  IFriends,
  IFriendsUser,
  IHasFriendController,
} from "../../../../lib/models/IFriends";
import { IGroup, IGroupObject } from "../../../../lib/models/IGroup";
import { IUser, IUserObject } from "../../../../lib/models/IUser";
import {
  AppActionEnum,
  SetFriendsCollectionList,
  SetFriendsCollectionSnap,
  SetGroupsCollectionSnap,
  SetGroupsObjectCollectionList,
  SetHasUserFriend,
  SetIsFriendsControllerLoaded,
  SetIsGroupsControllerLoaded,
  SetIsUsersControllerLoaded,
  SetMyGroupList,
  SetUsersCollectionSnap,
  SetUsersObjectCollectionList,
} from "../types";

export const AppReducerActionCreators = {
  setUsersObjectCollectionList: (
    obj: IUserObject
  ): SetUsersObjectCollectionList => ({
    type: AppActionEnum.SET_USERS_OBJECT_COLLECTION_LIST,
    payload: obj,
  }),
  setUsersCollectionSnap: (arr: IUser[]): SetUsersCollectionSnap => ({
    type: AppActionEnum.SET_USERS_COLLECTION_SNAP,
    payload: arr,
  }),
  setFriendsCollectionSnap: (arr: IFriends[]): SetFriendsCollectionSnap => ({
    type: AppActionEnum.SET_FRIENDS_COLLECTION_SNAP,
    payload: arr,
  }),
  setFriendsCollectionList: (
    arr: IFriendsUser[]
  ): SetFriendsCollectionList => ({
    type: AppActionEnum.SET_FRIENDS_COLLECTION_LIST,
    payload: arr,
  }),
  setGroupsCollectionSnap: (arr: IGroup[]): SetGroupsCollectionSnap => ({
    type: AppActionEnum.SET_GROUPS_COLLECTION_SNAP,
    payload: arr,
  }),
  setGroupsObjectCollectionList: (
    obj: IGroupObject
  ): SetGroupsObjectCollectionList => ({
    type: AppActionEnum.SET_GROUPS_OBJECT_COLLECTION_LIST,
    payload: obj,
  }),
  setMyGroupList: (arr: IGroup[]): SetMyGroupList => ({
    type: AppActionEnum.SET_MY_GROUP_LIST,
    payload: arr,
  }),
  setIsFriendsControllerLoaded: (
    flag: boolean
  ): SetIsFriendsControllerLoaded => ({
    type: AppActionEnum.SET_IS_FRIENDS_CONTROLLER_LOADED,
    payload: flag,
  }),
  setIsUsersControllerLoaded: (flag: boolean): SetIsUsersControllerLoaded => ({
    type: AppActionEnum.SET_IS_USERS_CONTROLLER_LOADED,
    payload: flag,
  }),
  setIsGroupsControllerLoaded: (
    flag: boolean
  ): SetIsGroupsControllerLoaded => ({
    type: AppActionEnum.SET_IS_GROUPS_CONTROLLER_LOADED,
    payload: flag,
  }),
  setHasUserFriend: (obj: IHasFriendController): SetHasUserFriend => ({
    type: AppActionEnum.SET_HAS_USER_FRIEND,
    payload: obj,
  }),
};
