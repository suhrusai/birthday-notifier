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
        const storageRef = ref(this.storage, file.name);
        console.log(storageRef)
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log(uploadTask)
        return uploadTask;
    }

    getDownloadURLUsingStorageRef(ref:any){
        return ref.getDownloadURL();
    }
}