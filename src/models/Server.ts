export default class Server{
    name: string;
    webhookUrl: string;
    id: string;
    constructor(name: string, webhookUrl: string, id: string){
        this.name = name;
        this.webhookUrl = webhookUrl;
        this.id = id;
    }
}