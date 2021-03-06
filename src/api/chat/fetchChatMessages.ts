import { collection, query, getDocs } from "firebase/firestore";
import { CollectionEnum } from "../../lib/enum/collection/CollectionEnum";
import { db } from "../../lib/firebase";
import { IMessageChat } from "../../lib/models/IMessage";

export async function fetchChatMessages(myId: string, deletedId: string) {
  try {
    const collRef = collection(
      db,
      CollectionEnum.USERS,
      myId,
      CollectionEnum.FRIENDS,
      deletedId,
      CollectionEnum.MESSAGES
    );
    const result: IMessageChat[] = [];
    const q = query(collRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      result.push({ ...doc.data(), messageID: doc.id });
    });
    return result;
  } catch (e: any) {
    throw new Error("Error download messege from DB");
  }
}
