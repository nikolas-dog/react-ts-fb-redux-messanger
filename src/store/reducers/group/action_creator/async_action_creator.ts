import { arrayUnion } from "firebase/firestore";
import { AppDispatch } from "../../..";
import { fetchNewGroupId } from "../../../../api/group/fetchNewGroupId";
import { updateGroup } from "../../../../api/group/updateGroup";
import { updateUserInvitationToGroupAdd } from "../../../../api/group/updateUserInvitationToGroupAdd";
import { onChangeAvatar } from "../../../../api/profile/onChangeAvatar";
import { uploadUpdateUser } from "../../../../api/user/uploadUpdateUser";
import { filterGroupCreateObject } from "../../../../lib/controller/group/filterGroupCreateObject";
import { filterGroupEditObject } from "../../../../lib/controller/group/filterGroupEditObject";
import {
  DefaultAvatar,
  IGenericObject,
} from "../../../../lib/models/DefaultValue";
import { IGroup, IGroupMember } from "../../../../lib/models/IGroup";
import { IUser } from "../../../../lib/models/IUser";
import { GroupReducerActionCreators } from "./reducer_action_creator";

export const GroupAsyncActionCreators = {
  setGroupCreate:
    (
      createObj: IGenericObject,
      avatarFile: any,
      invitedFriends: IUser[],
      rewrite: () => void,
      setStep: any
    ) =>
    async (dispatch: AppDispatch) => {
      dispatch(GroupReducerActionCreators.setGroupCreateIsLoaded(true));
      try {
        const filteredCreateObj: any = filterGroupCreateObject(createObj);
        filteredCreateObj.inviting = invitedFriends.map((it) => it.userID);
        console.log(filteredCreateObj);

        const groupId = await fetchNewGroupId();
        let photoUrl: string = DefaultAvatar.GROUP__IMAGE;
        if (avatarFile !== null) {
          let prom = await onChangeAvatar(`groupsPhoto/${groupId}`, avatarFile);
          if (prom !== undefined) {
            photoUrl = prom;
          }
        }
        filteredCreateObj.groupId = groupId;
        filteredCreateObj.groupAvatar = photoUrl;
        const groupObject: IGroup = {
          groupId: groupId,
          groupAvatar: photoUrl,
          ...filteredCreateObj,
        };
        await updateGroup(groupId, groupObject);
        await uploadUpdateUser(groupObject.admin, {
          myGroup: arrayUnion(groupId),
        });
        updateUserInvitationToGroupAdd(invitedFriends, groupId);
        rewrite();
        dispatch(GroupReducerActionCreators.setOpenPopupCreateGroup(false));
        setTimeout(() => {
          setStep(1);
        }, 500);
      } catch (e: any) {
        console.log(e.message);
      } finally {
        dispatch(GroupReducerActionCreators.setGroupCreateIsLoaded(false));
      }
    },
  setGroupEdit:
    (
      groupId: string,
      editObject: IGenericObject,
      avatarFile: any,
      rewrite: () => void,
      setEditIsLoaded: any
    ) =>
    async (dispatch: AppDispatch) => {
      setEditIsLoaded(true);
      try {
        let filteredEditObject = filterGroupEditObject(editObject);
        let newAvatarUrl: string | null = null;
        if (avatarFile !== null) {
          let prom = await onChangeAvatar(`groupsPhoto/${groupId}`, avatarFile);
          if (prom !== undefined) {
            newAvatarUrl = prom;
          } else {
            newAvatarUrl = null;
          }
        }
        if (newAvatarUrl !== null) {
          if (filteredEditObject === undefined) {
            filteredEditObject = { groupAvatar: newAvatarUrl };
          } else {
            filteredEditObject!.groupAvatar = newAvatarUrl;
          }
        }
        await updateGroup(groupId, filteredEditObject);
        rewrite();
      } catch (e: any) {
        console.log(e.message);
      } finally {
        setEditIsLoaded(false);
        dispatch(GroupReducerActionCreators.setOpenPopupEditGroup(false));
      }
    },
  setAcceptUserToGroup:
    (
      user: IUser,
      group: IGroup,
      handleCloseCard: () => void,
      snackBarOpen: (
        text: string,
        status: "success" | "error" | "info" | "warning"
      ) => void
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        const invitingFiltered: string[] = group.inviting.filter(
          (item: string) => item !== user.userID
        );
        const invitationToGroupfiltered: string[] =
          user.invitationToGroup.filter(
            (item: string) => item !== group.groupId
          );
        const memberObject: IGroupMember = {
          userId: user.userID,
          joined: new Date(),
        };
        const objUpdateGroup = {
          inviting: invitingFiltered,
          members: [...group.members, memberObject],
          member_amount: group.member_amount + 1,
        };
        const objUpdateUser = {
          invitationToGroup: invitationToGroupfiltered,
          myGroup: [...user.myGroup, group.groupId],
        };
        await updateGroup(group.groupId, objUpdateGroup);
        snackBarOpen(
          "You have accepted an invitation to this group. And now you are a member",
          "success"
        );
        handleCloseCard();
        setTimeout(async () => {
          await uploadUpdateUser(user.userID, objUpdateUser);
        }, 1000);
      } catch (e: any) {
        console.log(e.message);
      }
    },
  setRejectUserToGroup:
    (
      user: IUser,
      group: IGroup,
      handleCloseCard: () => void,
      snackBarOpen: (
        text: string,
        status: "success" | "error" | "info" | "warning"
      ) => void
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        const invitingFiltered: string[] = group.inviting.filter(
          (item: string) => item !== user.userID
        );
        const invitationToGroupfiltered: string[] =
          user.invitationToGroup.filter(
            (item: string) => item !== group.groupId
          );
        const objUpdateGroup = { inviting: invitingFiltered };
        const objUpdateUser = {
          invitationToGroup: invitationToGroupfiltered,
        };
        await updateGroup(group.groupId, objUpdateGroup);
        snackBarOpen("Request to add to group was declined!!!", "error");
        handleCloseCard();
        setTimeout(async () => {
          await uploadUpdateUser(user.userID, objUpdateUser);
        }, 1000);
      } catch (e: any) {
        console.log(e.message);
      }
    },
  setInviteUserToGroup:
    (
      invitedFriends: IUser[],
      selectedGroup: string,
      invitingUploadArray: string[],
      setIsInviteLoaded: any,
      rewrite: () => void
    ) =>
    async (dispatch: AppDispatch) => {
      setIsInviteLoaded(true);
      try {
        const uploadGroupObject = { inviting: invitingUploadArray };
        await updateGroup(selectedGroup, uploadGroupObject);
        await updateUserInvitationToGroupAdd(invitedFriends, selectedGroup);
        rewrite();
      } catch (e: any) {
        console.log(e.message);
      } finally {
        setIsInviteLoaded(false);
      }
    },
};
