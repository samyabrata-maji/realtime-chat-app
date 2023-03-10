import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmo9VHKclOXKr4T1jzcaP2ERa9_Xfk8uo",
  authDomain: "realtimechatapp-67461.firebaseapp.com",
  projectId: "realtimechatapp-67461",
  storageBucket: "realtimechatapp-67461.appspot.com",
  messagingSenderId: "168955056257",
  appId: "1:168955056257:web:410930168cfaab9b6dbd80",
  measurementId: "G-CNRS7DWKXC",
};

const fireApp = initializeApp(firebaseConfig);

export const fireAuth = getAuth(fireApp);

export const fireDb = getFirestore(fireApp);

interface UserData {
  username: string;
  profile_url?: string;
  bio?: string;
  chatrooms?: ChatRoomsData[];
}

interface ChatHistoryData {
  message: string;
  senderID: string;
}
interface ChatRoomsData {
  participants: string[];
  history: ChatHistoryData[];
}

/* if user exists, it will override it */
export const createUserFromUID = (uid: string, data: UserData) => {
  setDoc(doc(fireDb, `users/${uid}`), data);
  setDoc(doc(fireDb, `usernames/${data.username}`), { uid });
};

export const checkIfUsernameExists = async (
  username: string
): Promise<boolean> => {
  return (await getDoc(doc(fireDb, `usernames/${username}`))).exists();
};

// returns a list of users
export const getUsers = (limit: number): void => {};

export default fireApp;
