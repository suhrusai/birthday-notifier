import FirebaseServicesProvider  from "./FirebaseServicesProvider";
import { getDocs,query,updateDoc,collection,where,doc, addDoc, getDoc } from "firebase/firestore";
import Server from "@/models/Server";
const SERVERS_COLLECTION_NAME:string ="servers";
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
class ServerService{
    fireStore:any;
    constructor(){
        this.fireStore = FirebaseServicesProvider.getFirebaseServicesProviderInstance().getFirestoreDBInstance();
    }
    addServer(server:Server){
        server.id = uuidv4();
        return addDoc(collection(this.fireStore, SERVERS_COLLECTION_NAME), {
            name : server.name,
            webhookUrl : server.webhookUrl,
            id: server.id
        });
    }
    deleteServer(serverId:string){
        return this.fireStore.collection(SERVERS_COLLECTION_NAME).doc(serverId).delete();
    }
    async updateServer(server:Server){
        const q = query(collection(this.fireStore, SERVERS_COLLECTION_NAME), where("id", "==", server.id));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.size > 0){
            const doc = querySnapshot.docs[0];
            return updateDoc(doc.ref, {
                name : server.name,
                webhookUrl : server.webhookUrl,
                id: server.id
            });
        }
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        //   });
          
        // console.log((await getDoc(collection(SERVERS_COLLECTION_NAME,doc.id))).data());
        // return updateDoc(serverRef, {
        //     name : server.name,
        //     webhookUrl : server.webhookUrl,
        //     id: server.id
        // });
    }
    async verifyIfServerExists(serverId:string){
        const q = query(collection(this.fireStore, SERVERS_COLLECTION_NAME), where("id", "==", serverId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size > 0;
    }
    readServers(){
        return getDocs(collection(this.fireStore,SERVERS_COLLECTION_NAME));
    }
    readServer(serverId:string){
        return this.fireStore.collection("servers").doc(serverId).get();
    }
}

export default ServerService;