<template>
    <v-card width="auto">
        <v-card-title>
                Add Birthday
        </v-card-title>
        <v-card-title>
            <v-row>
                <v-col cols="12" md="6" xs="12">
                    <v-text-field label="Name" v-model="birthday.name"></v-text-field>
                    <v-text-field label="Date" v-model="birthday.date"></v-text-field>
                    <!-- <v-xztext-field label="Image Url" v-model="birthday.imageUrl"></v-xztext-field> -->
                    <v-select
                        :items="birthday.images"
                        label="Image Url"
                        v-model="birthday.imageUrl"
                    ></v-select>
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
                    <v-select
                        v-model="birthday.gender"
                        :items="['M','F']"
                        chips
                        label="Chips"
                    ></v-select>
            </v-col>
            <v-col cols="12" md="6" xs="12">
                <CustomImage :src="birthday.imageUrl" v-if="birthday.imageUrl" :key="birthday.imageUrl" height="100%"></CustomImage>
            </v-col>
            </v-row>
            <v-row>
                <v-col offset-md="11" xs="12">
                    <v-btn color="primary" :loading="saveInProgress" @click="saveBirthday">
                        Save
                    </v-btn>
                </v-col>
            </v-row>
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
    import { clone } from '@/customUtilities';
    import CustomImage from '../CustomImage.vue';
    const serverService = new ServerService();
    const fileService = new FileService();
    const birthdayService = new BirthdayService();
    export default {
    props: {
        birthdayInput: {
            type: Birthday
        }
    },
    data: () => ({
        birthday: new Birthday("", "", "", new Array<string>(), "", new Array<string>(),""),
        servers: new Array<Server>(),
        fileSelected: Array<File>(),
        uploadInProgress: false,
        saveInProgress: false,
        actionType: "Add",
        imageChaned : true
    }),
    async beforeMount() {
        if (this.birthdayInput) {
            this.birthday = clone(this.birthdayInput);
            this.actionType = "Edit";
        }
        if(!this.birthday.imageUrl){
            this.birthday.imageUrl = "";
        }
        this.servers = await serverService.readServers();
    },
    methods: {
        async uploadFile() {
            console.log(this.fileSelected[0]);
            this.uploadInProgress = true;
            const uploadTask = await fileService.uploadFile(this.fileSelected[0], "");
            this.uploadInProgress = false;
            console.log(uploadTask);
            //download url
            getDownloadURL(uploadTask.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                this.birthday.imageUrl = downloadURL;
                if (this.birthday.images && this.birthday.images.find(x => x == downloadURL) == undefined)
                    this.birthday.images.push(downloadURL);
                else
                    this.birthday.images = [downloadURL];
            });
        },
        async saveBirthday() {
            this.saveInProgress = true;
            if (this.actionType == "Edit") {
                console.log(this.birthday);
                await birthdayService.updateBirthday(this.birthday);
            }
            else if (this.actionType == "Add")
                await birthdayService.addBirthday(this.birthday);
            this.saveInProgress = false;
            this.$emit('submit')
        }
    },
    watch:{
        'birthday.imageUrl' : function(){
            console.log("image url changed");
        }
    },
    computed: {
        serverItems() {
            let serverMap: Array<any> = new Array();
            this.servers.forEach(server => {
                serverMap.push({ value: server.id, title: server.name });
            });
            return serverMap;
        }
    },
    components: { CustomImage }
}
</script>