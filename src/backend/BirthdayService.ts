import  FirebaseServicesProvider  from './FirebaseServicesProvider';
import Birthday from '../models/Birthday';
import { getDocs,collection } from 'firebase/firestore';
class BirthdayService{
    db:any;
    constructor(){
        this.db = FirebaseServicesProvider.getFirebaseServicesProviderInstance().getFirestoreDBInstance()
    }
    addBirthday(birthday:Birthday){
        birthday.id = "";
        return this.db.collection("birthdays").add(birthday);
    }
    deleteBirthday(birthdayId:string){
        return this.db.collection("birthdays").doc(birthdayId).delete();
    }
    updateBirthday(birthday:Birthday){
        return this.db.collection("birthdays").doc(birthday.id).update(birthday);
    }
    filterBirthdayByServer(serverId:string){
        return this.db.collection("birthdays").where("servers", "array-contains", serverId).get();
    }
    getBirthdays(){
        console.log(this.db)
        return getDocs(collection(this.db,"birthdays"));
    }
    getBirthdayById(birthdayId:string){
        return this.db.collection("birthdays").doc(birthdayId).get();
    }
}

export default BirthdayService;