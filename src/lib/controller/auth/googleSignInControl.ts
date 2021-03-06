import { uploadNewUser } from "../../../api/auth/uploadNewUser";
import { IUser } from "../../models/IUser";

export async function googleSignInControl(googleUserSnap: any, checkDB: any) {
  if (checkDB.exists()) {
    const user = checkDB.data() as IUser;
    return user;
  } else {
    try {
      const fullName = googleUserSnap.user.displayName?.split(" ");
      const userObj: IUser = {
        name: fullName![0],
        lastname: fullName![1],
        fullname: `${fullName![0]} ${fullName![1]}`,
        userID: googleUserSnap.user.uid,
        urlPhoto: googleUserSnap.user.photoURL!,
        online: true,
        info: {
          birthDay: null,
          email: googleUserSnap.user.email,
          hobby: null,
          instagram: null,
          twitter: null,
          joined: new Date(),
          location: null,
        },
        invitationToGroup: [],
        myGroup: [],
      };
      await uploadNewUser(userObj, googleUserSnap.user.uid);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
