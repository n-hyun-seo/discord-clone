import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../config/firebase";

export let pendingList = [];

async function getPendingList() {
  async function getListData() {
    const user = getAuth().currentUser;
    const docSnapshot = onSnapshot(doc(db, "users", user.uid), async (data) => {
      let listData = await data.data().friends.pending;
      let finalList = await Promise.all(
        listData.map(async (user) => {
          let { requestType } = user;
          const docSnapshot = await getDoc(doc(db, "users", user.uid));
          const userData = await docSnapshot.data().userInfo;
          return { ...userData, requestType };
        })
      );
      pendingList = finalList;
    });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await getListData();
    } else {
    }
  });
}

getPendingList();
