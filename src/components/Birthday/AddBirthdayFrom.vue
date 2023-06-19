<template>
    <v-card>
        <v-card-title>
                Add Birthday
        </v-card-title>
        <v-card-title>
            <div class="flex">
                <v-text-field label="Name" v-model="birthday.name"></v-text-field>
                <v-text-field label="Date" v-model="birthday.date"></v-text-field>
                <v-text-field label="Image Url" v-model="birthday.imageUrl"></v-text-field>
                <div class="d-flex">
                    <v-file-input
                    show-size
                    counter
                    multiple
                    label="upload image"
                    v-model="fileSelected"
                    @change = "uploadFile"
                ></v-file-input>
                <v-progress-circular
                    indeterminate
                    color="yellow-darken-2"
                    class="text-center align-middle"
                    v-if="uploadInProgress"
                    ></v-progress-circular>
                </div>
                <v-select
                    v-model="birthday.servers"
                    :items="serverItems"
                    chips
                    label="Chips"
                    multiple
                ></v-select>
                <v-btn color="primary" :loading="saveInProgress" @click="saveBirthday">
                    Save
                </v-btn>
            </div>
        </v-card-title>

    </v-card>
</template>
<script lang="ts">
    import ServerService from '@/backend/ServerService';
    import Server from '@/models/Server';
    import Birthday from '@/models/Birthday';
    import { FileService } from '@/backend/FileService';
    import { getDownloadURL } from 'firebase/storage';
    import BirthdayService from '@/backend/BirthdayService';
    const serverService = new ServerService();
    const fileService = new FileService();
    const birthdayService = new BirthdayService();
    export default {
        data: () => ({
            birthday: new Birthday("","","",new Array<string>(),"",new Array<string>()),
            servers : new Array<Server>(),
            fileSelected: Array<File>(),
            uploadInProgress: false,
            saveInProgress: false
        }),
        methods: {
            async uploadFile(){
                console.log(this.fileSelected[0])
                this.uploadInProgress = true;
                const uploadTask = await fileService.uploadFile(this.fileSelected[0],"")
                this.uploadInProgress = false;
                console.log(uploadTask)
                //download url
                getDownloadURL(uploadTask.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    this.birthday.imageUrl = downloadURL;
                    if(this.birthday.images)
                        this.birthday.images.push(downloadURL);
                    else
                        this.birthday.images = [downloadURL];
                });             
            },
            async saveBirthday(){
                this.saveInProgress = true;
                await birthdayService.addBirthday(this.birthday);
                this.saveInProgress = false;
            }
        },
        async beforeMount() {
            this.servers = await serverService.readServers();
        },
        computed: {
            serverItems() {
                let serverMap:Array<any> = new Array();
                this.servers.forEach(server => {
                    serverMap.push({value: server.id, title: server.name});
                });
                return serverMap;
            }
        }
    }
</script>