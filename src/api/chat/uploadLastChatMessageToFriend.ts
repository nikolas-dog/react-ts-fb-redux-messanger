import { doc, getDoc, updateDoc } from "firebase/firestore";
import { CollectionEnum } from "../../lib/enum/collection/CollectionEnum";
import { db } from "../../lib/firebase";
import { IMessageChat } from "../../lib/models/IMessage";

export async function uploadLastChatMessageToFriend(
  myId: string,
  selectedId: string,
  lastMessage: IMessageChat
) {
  try {
    const docRef = doc(
      db,
      CollectionEnum.USERS,
      selectedId,
      CollectionEnum.FRIENDS,
      myId
    );
    const friendDoc = await getDoc(docRef);
    await updateDoc(docRef, {
      lastMessage: lastMessage,
      unread: friendDoc.data()!.unread + 1,
    });
  } catch (e: any) {
    throw new Error("Error upload last message!!!");
  }
}
