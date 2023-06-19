class Birthday {
    name: string;
    date: string;
    imageUrl: string;
    images: string[]|null;
    servers: string[]|null;
    id :string;
    constructor(name: string, date: string, imageUrl: string, servers: string[] | null, id: string, images: string[]|null){
        this.name = name;
        this.date = date;
        this.imageUrl = imageUrl;
        this.servers = servers;
        this.id = id;
        this.images = images;
    }
}

export default Birthday;