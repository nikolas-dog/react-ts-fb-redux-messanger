import { AppDispatch } from "../../..";
import { fetchGlobalContact } from "../../../../api/contact/fetchGlobalContact";
import { fetchMyContact } from "../../../../api/contact/fetchMyContact";
import { uploadDeleteFromMyContact } from "../../../../api/contact/uploadDeleteFromMyContact";
import { uploadToMyContact } from "../../../../api/contact/uploadToMyContact";
import { filterContactArray } from "../../../../lib/controlFunc/contact/filterContactArray";
import { filterGlobalContact } from "../../../../lib/controlFunc/contact/filterGlobalContact";
import { IUser } from "../../../../lib/models/IUser";
import { ContactActionCreators } from "./reducer_action_creator";

export const AsyncContactActionCreators = {
  setFetchAllContact: (myId: string) => async (dispatch: AppDispatch) => {
    dispatch(ContactActionCreators.setIsContactLoading(true));
    try {
      const globalContact: IUser[] = await fetchGlobalContact();
      const myContact: IUser[] = await fetchMyContact(myId);
      const filteredGlobalContact = filterGlobalContact(
        myId,
        globalContact,
        myContact
      );
      dispatch(ContactActionCreators.setGlobalContact(filteredGlobalContact));
      dispatch(
        ContactActionCreators.setFilteredGlobalContact(filteredGlobalContact)
      );
      dispatch(ContactActionCreators.setMyContact(myContact));
      dispatch(ContactActionCreators.setFilteredMyContact(myContact));
      dispatch(ContactActionCreators.setContactError(null));
    } catch (e: any) {
      dispatch(ContactActionCreators.setContactError(e.message));
      console.log(e.message);
    } finally {
      dispatch(ContactActionCreators.setIsContactLoading(false));
    }
  },

  setAllContact:
    (
      contact: IUser,
      userId: string,
      myContact: IUser[],
      globalContact: IUser[],
      filtMyContact: IUser[],
      filtGlobalContact: IUser[]
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(ContactActionCreators.setMyContact([...myContact, contact]));
        dispatch(
          ContactActionCreators.setFilteredMyContact([
            ...filtMyContact,
            contact,
          ])
        );
        uploadToMyContact(userId, contact);
        const filterClone = filterContactArray(globalContact, contact.userID);
        const filterFilteredClone = filterContactArray(
          filtGlobalContact,
          contact.userID
        );
        dispatch(ContactActionCreators.setGlobalContact(filterClone));
        dispatch(
          ContactActionCreators.setFilteredGlobalContact(filterFilteredClone)
        );
      } catch (e: any) {
        dispatch(ContactActionCreators.setContactError(e.message));
      }
    },
  setDeleteFromMyContact:
    (
      contact: IUser,
      myId: string,
      myContact: IUser[],
      filteredGlobalContact: IUser[]
    ) =>
    async (dispatch: AppDispatch) => {
      dispatch(ContactActionCreators.setIsContactLoading(true));
      try {
        const filteringMyContact = filterContactArray(
          myContact,
          contact.userID
        );
        await uploadDeleteFromMyContact(myId, contact.userID);
        dispatch(ContactActionCreators.setMyContact(filteringMyContact));
        dispatch(
          ContactActionCreators.setFilteredMyContact(filteringMyContact)
        );
        const newGlobalContact: IUser[] = [...filteredGlobalContact, contact];
        dispatch(
          ContactActionCreators.setFilteredGlobalContact(newGlobalContact)
        );
        dispatch(ContactActionCreators.setSelectedContact({} as IUser));
      } catch (e: any) {
        dispatch(ContactActionCreators.setContactError(e.message));
      } finally {
        dispatch(ContactActionCreators.setIsContactLoading(false));
      }
    },
};