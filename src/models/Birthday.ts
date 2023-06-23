class Birthday {
    name: string;
    date: string;
    imageUrl: string;
    images: string[]|null;
    servers: string[]|null;
    id :string;
    gender: string;
    constructor(name: string, date: string, imageUrl: string, servers: string[] | null, id: string, images: string[]|null,gender: string){
        this.name = name;
        this.date = date;
        this.imageUrl = imageUrl;
        this.servers = servers;
        this.id = id;
        this.images = images;
        this.gender = gender
    }
}

export default Birthday;