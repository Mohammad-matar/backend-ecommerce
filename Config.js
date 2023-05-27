import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import admin from "firebase-admin";
import serviceAccount from "./path/to/serviceAccountKey.json";


const firebaseConfig = {
  apiKey: "AIzaSyC9Jsn9pAd5W4dnBJL9T8R8gtpCfdbRUeo",
  authDomain: "ecommerce-f4c3f.firebaseapp.com",
  projectId: "ecommerce-f4c3f",
  storageBucket: "ecommerce-f4c3f.appspot.com",
  messagingSenderId: "86766281018",
  appId: "1:86766281018:web:4346d69bb90d8f45967003",
  measurementId: "G-NM47LGQTL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { app, analytics, admin };

