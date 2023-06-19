export default class Server{
    name: string;
    channelName: string;
    channelId: string;
    id: string;
    serverId: string;
    constructor(name: string,channelName: string,channelId: string, id: string, serverId: string){
        this.name = name;
        this.channelName = channelName;
        this.channelId = channelId;
        this.id = id;
        this.serverId = serverId;
    }
}