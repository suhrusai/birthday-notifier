import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
interface firebaseConfig{
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}
const firebaseConfig:firebaseConfig = {
    apiKey: "AIzaSyCGXfO86XhcMKWws6wLYsoePUw73vxdGo8",
    authDomain: "birthday-reminder-pro.firebaseapp.com",
    projectId: "birthday-reminder-pro",
    storageBucket: "birthday-reminder-pro.appspot.com",
    messagingSenderId: "380460265082",
    appId: "1:380460265082:web:1228a9aa9c7960346c15c3",
    measurementId: "G-T6J2TN0G13"
  };
export default class FirebaseServicesProvider{
    app: any = null;
    private static _instance: FirebaseServicesProvider;
    constructor () {
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
    }
    static getFirebaseServicesProviderInstance(){
        return this._instance || (this._instance = new this());
    }
    getFirestoreDBInstance() {
        // Initialize Cloud Firestore and get a reference to the service
        const db = getFirestore(this.app);
        return db;
    }
    getStorageInstance(){
        // Initialize Cloud Storage and get a reference to the service
        const storage = getStorage(this.app);
        return storage;
    }
}
