
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";  
  //untuk memberi autentikasi email dan password
import { getAuth } from "firebase/auth";
//lokasi penyimpanan file
import { getFirestore} from "firebase/firestore";
//storage untuk menyimpan gambar
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBeGiRQDw4RFZpiElSIhgCzd-yz_PoLKBk",
    authDomain: "portofolio-ku-bfdcc.firebaseapp.com",
    projectId: "portofolio-ku-bfdcc",
    storageBucket: "portofolio-ku-bfdcc.firebasestorage.app",
    messagingSenderId: "284937118946",
    appId: "1:284937118946:web:f0928e50c2f329ffb66abb"
  };

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)
// const storage = getStorage(app)

// supaya bisa di rute
export {auth, db}

//==================