// firebaseFbData.js
//file
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDDqk_ntsLZLN_n3UFWxAGl28mq0W3ROC0",
    authDomain: "fb-data-17cd1.firebaseapp.com",
    databaseURL: "https://fb-data-17cd1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fb-data-17cd1",
    storageBucket: "fb-data-17cd1.appspot.com",
    messagingSenderId: "484467128216",
    appId: "1:484467128216:web:a026fb608cd2075a49dded"
  };

const appFbData = initializeApp(firebaseConfig, "fb-data");
const storage = getStorage(appFbData);

export { storage };
