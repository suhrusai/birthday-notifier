import  FirebaseServicesProvider  from './FirebaseServicesProvider';
import Birthday from '../models/Birthday';
import { getDocs,collection, addDoc,updateDoc,doc,where,query, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { uuidv4 } from '@/customUtilities';
const BIRTHDAY_COLLECTION_NAME:string ="birthdays";
class BirthdayService{
    db:any;
    constructor(){
        this.db = FirebaseServicesProvider.getFirebaseServicesProviderInstance().getFirestoreDBInstance()
    }
    addBirthday(birthday:Birthday){
        birthday.id = uuidv4();
        return addDoc(collection(this.db,"birthdays"), {
            name : birthday.name,
            date : birthday.date,
            id: birthday.id,
            servers : birthday.servers,
            imageUrl : birthday.imageUrl,
            images: birthday.images,
            gender: birthday.gender
        });
    }
    deleteBirthday(birthdayId:string){
        return this.db.collection("birthdays").doc(birthdayId).delete();
    }
    updateBirthday(birthday:Birthday){
        const docRef = doc(this.db, BIRTHDAY_COLLECTION_NAME,birthday.id);
        return updateDoc(docRef, {
            name : birthday.name,
            date : birthday.date,
            servers : birthday.servers,
            imageUrl : birthday.imageUrl,
            images: birthday.images
        });
    }
    filterBirthdayByServer(serverId:string){
        return this.db.collection("birthdays").where("servers", "array-contains", serverId).get();
    }
    async getBirthdays():Promise<Birthday[]>{
        console.log(this.db)
        const birthdays:Birthday[] = new Array<Birthday>;
        const birthdaysSnapshot:QuerySnapshot<DocumentData> = await getDocs(collection(this.db,"birthdays"));
        birthdaysSnapshot.forEach((document : any) => {
            const birthday: Birthday = document.data();
            birthday.id=document.id;
            birthdays.push(birthday)
        });
        return birthdays;
    }
    getBirthdayById(birthdayId:string){
        return this.db.collection("birthdays").doc(birthdayId).get();
    }
}

export default BirthdayService;