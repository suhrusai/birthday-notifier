import FirebaseServicesProvider  from "./FirebaseServicesProvider";
import { getDocs,query,setDoc,collection,where,doc, addDoc, getDoc, updateDoc, deleteDoc, DocumentData, QuerySnapshot } from "firebase/firestore";
import Server from "@/models/Server";
import { uuidv4 } from "@/customUtilities";
const SERVERS_COLLECTION_NAME:string ="servers";
class ServerService{
    fireStore:any;
    constructor(){
        this.fireStore = FirebaseServicesProvider.getFirebaseServicesProviderInstance().getFirestoreDBInstance();
    }
    addServer(server:Server){
        return addDoc(collection(this.fireStore, SERVERS_COLLECTION_NAME), {
            name : server.name,
            channelId : server.channelId,
            channelName : server.name,
            serverId : server.serverId,
            id: server.id
        });
    }
    async deleteServer(serverId:string){
        await deleteDoc(doc(this.fireStore, SERVERS_COLLECTION_NAME, serverId));
    }
    async updateServer(server:Server){
        const docRef = doc(this.fireStore, SERVERS_COLLECTION_NAME,server.id)
        return updateDoc(docRef, {
            name : server.name,
            channelId : server.channelId,
            channelName : server.name,
            serverId : server.serverId,
            id: server.id
        });
    }
    async verifyIfServerExists(serverId:string){
        const q = query(collection(this.fireStore, SERVERS_COLLECTION_NAME), where("id", "==", serverId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.size > 0;
    }
    async readServers(){
        const res:QuerySnapshot<DocumentData> = await getDocs(collection(this.fireStore,SERVERS_COLLECTION_NAME));
        const servers:Server[] = new Array<Server>();
        res.forEach((doc:any) => {
            const server:Server = doc.data();
            server.id = doc.id;
            servers.push(server);
        });
        return servers;
    }
    readServer(serverId:string){
        return this.fireStore.collection("servers").doc(serverId).get();
    }
}

export default ServerService;