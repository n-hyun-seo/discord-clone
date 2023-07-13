import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../../../config/firebase";

export let blockedList = [];

async function getBlockedList() {
  async function getListData() {
    const user = getAuth().currentUser;
    const docSnapshot = onSnapshot(doc(db, "users", user.uid), async (data) => {
      let listData = await data.data().friends.blocked;
      let finalList = await Promise.all(
        listData.map(async (uid) => {
          const docSnapshot = await getDoc(doc(db, "users", uid));
          const userData = await docSnapshot.data().userInfo;
          return userData;
        })
      );
      blockedList = finalList;
    });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await getListData();
    } else {
    }
  });
}


