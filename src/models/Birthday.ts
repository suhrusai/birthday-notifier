import { Timestamp } from "firebase/firestore";
import  Server  from "../models/Server";
class Birthday {
    name: string;
    date: Timestamp|null;
    imageUrl: string;
    servers: string[]|null;
    id :string;
    constructor(name: string, date: Timestamp|null, imageUrl: string, servers: string[] | null, id: string){
        this.name = name;
        this.date = date;
        this.imageUrl = imageUrl;
        this.servers = servers;
        this.id = id;
    }
}

export default Birthday;