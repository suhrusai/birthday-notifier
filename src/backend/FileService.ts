import { UploadTask, ref, uploadBytesResumable } from "firebase/storage";
import FirebaseServicesProvider from './FirebaseServicesProvider';
export class FileService{
    storage: any;
    constructor(){
        let storage = FirebaseServicesProvider.getFirebaseServicesProviderInstance().getStorageInstance();
        while(!storage)
            storage = FirebaseServicesProvider.getFirebaseServicesProviderInstance().getStorageInstance();
        this.storage = storage;
    }
    async uploadFile(file:File, basePath: string): Promise<UploadTask>{
        console.log(file.name)
        const storageRef = ref(this.storage,file.name);
        console.log(storageRef)
        const metaData = {
            contentType: file.type,
            cacheControl: 'public,max-age=36000000',
        }
        const uploadTask = uploadBytesResumable(storageRef, file,metaData);
        console.log(uploadTask)
        return uploadTask;
    }

    getDownloadURLUsingStorageRef(ref:any){
        return ref.getDownloadURL();
    }
}