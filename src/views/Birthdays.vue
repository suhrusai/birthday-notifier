<template>
    <v-row>
        <v-col cols="12" sm="12" md="4">
            <span>Sort</span>
            <v-select 
                v-model="choosenSort"
                :items="sortCriterions">
            </v-select>
        </v-col>
        <v-col offset="5" md="3" sm="12" class="d-flex">
            <div class="align-self-center">
                <v-btn 
                    color = "transparent"
                    append-icon="mdi-refresh"
                    class="mr-2"
                    @click="fetchBirthdays"
                    :disabled="fetchingBirthdays">
                    Refresh
                </v-btn>
                <v-btn color="primary" @click="editBirthday(null)" append-icon="mdi-plus">
                Add Birthday
                </v-btn>
            </div>
        </v-col>    
    </v-row>

    <div class="d-flex flex-wrap justify-center">
        <v-card
        variant="tonal"
        width="320"
        class="pa-3 ma-2"
         v-for="birthday in birthdays" :key="birthday.id" >
            <CustomImage :src="birthday.imageUrl" height="300px" @imageClicked="imageClicked(birthday.imageUrl)" v-if="birthday.imageUrl"></CustomImage>
            <CustomImage 
                src="https://media.istockphoto.com/id/1311461815/vector/illustration-vector-graphic-design-asset-of-cream-cake-suitable-for-multipurpose-content.jpg?s=612x612&w=0&k=20&c=JeNpdxUftEdYWWjPRiqUCWxYQs10Y8ulLy03RFNFdIE=" 
                height="300px" v-if="!birthday.imageUrl"></CustomImage>
            <v-card-title class="pa-0">
                {{ birthday.name }}
            </v-card-title>
            <v-card-text class="pa-0">
                <b>DOB:</b> {{ birthday.date }}
            </v-card-text>
            <v-card-text class="pa-0">
                <b>Servers: </b>
                <v-chip v-for="serverId in birthday.servers" class="mr-2" variant="elevated" size="small" :key="serverId">
                    <v-progress-circular
                        v-if="fetchingServers"
                        indeterminate
                        color="yellow-darken-2">
                    </v-progress-circular>
                    {{ getServerName(serverId) }}
                </v-chip>
            </v-card-text>
            <v-btn color="primary" variant="text" @click="editBirthday(birthday)">
                Edit
            </v-btn>
        </v-card>
    </div>
    <v-dialog v-model="imageDialog.show" width="auto">
        <v-card>
            <v-card-text v-show="!imageDialog.imageLoading" >
                <ImageTag :src="imageDialog.imageUrl" class="dialog-image-preview" @imageLoaded="imageDialog.imageLoading=false"/>
            </v-card-text>
            <v-card-text v-if="imageDialog.imageLoading">
                <v-progress-circular
                indeterminate
                color="yellow-darken-2"
                class="text-center align-middle"
                ></v-progress-circular>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="showManageDialog">
        <AddBirthdayForm :birthdayInput="birthdayToEdit" @submit="manageFormSubmitted()"></AddBirthdayForm>
    </v-dialog>
</template>
<script lang="ts">
    import CustomImage from '@/components/CustomImage.vue';
    import BirthdayService from '@/backend/BirthdayService';
    import Birthday from '@/models/Birthday';
    import ServerService from '@/backend/ServerService';
    import Server from '@/models/Server';
    import AddBirthdayForm from '@/components/Birthday/AddBirthdayFrom.vue'
    import ImageTag from '@/components/ImageTag.vue';
    const birthdayService = new BirthdayService();
    const serverService = new ServerService();
    export default {
        data: () => ({
            birthdays: new Array<Birthday>(),
            servers: new Array<Server>(),
            fetchingServers: false,
            showManageDialog: false,
            birthdayToEdit: undefined,
            fetchingBirthdays: false,
            choosenSort: 'NearBday',
            sortCriterions: [
                { title: 'Nearest Birthday', value: 'NearBday' },
                { title: 'Farthest Birthday', value: 'FarBday' },
                { title: 'Ascending Date', value: 'ascDate' },
                { title: 'Descending Date', value: 'descDate' },
            ],
            imageDialog: {
                height: '100px',
                width: '100px',
                imageLoading : true,
                imageUrl: '',
                show: false
            }
        }),
        components: {
            CustomImage,
            AddBirthdayForm,
            ImageTag
        },
        watch:{
            'choosenSort': {
                handler: function(val, oldVal) {
                    this.applySort(val);
                }
            }
        },
        async beforeMount() {
            await this.fetchBirthdays();
        },
        computed:{
            placeholderImageUrl(){
                return require('@/assets/');
            }
        },
        methods: {
            async fetchBirthdays(){
                this.fetchingBirthdays = true;
                this.birthdays = [];
                this.birthdays = await birthdayService.getBirthdays();
                this.applySort(this.choosenSort);
                this.fetchServers();
                this.fetchingBirthdays = false;
            },
            fetchServers: async function(){
                this.fetchingServers = true;
                this.servers = [];
                this.servers = await serverService.readServers();
                this.fetchingServers = false;
            },
            applySort(sortCriterion: string){
                switch(sortCriterion){
                        case 'NearBday':
                            this.sortByNearest();
                            break;
                        case 'FarBday':
                            this.sortByNearest(false);
                            break;
                        case 'ascDate':
                            this.sortBirthdays();
                            break;
                        case 'descDate':
                            this.sortBirthdays(false);
                            break;
                    }
            },
            manageFormSubmitted: async function(){
                this.showManageDialog = false;
                await this.fetchBirthdays();
                this.sortByNearest();
            },
            sortBirthdays(ascending = true) {
                this.birthdays.sort((a, b) => {
                    const dateA = new Date("2000/" + a.date.substr(3, 2) + "/" + a.date.substr(0, 2));
                    const dateB = new Date("2000/" + b.date.substr(3, 2) + "/" + b.date.substr(0, 2));
                    return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()    ;
                })
            },
            sortByNearest(ascending = true){
                var today = new Date();
                var currentYear = today.getFullYear(); // Get the current date
                this.birthdays.sort(function(a, b) {
                    var dayA = parseInt(a.date.substr(0, 2));
                    var monthA = parseInt(a.date.substr(3, 2));
                    var yearA = parseInt(a.date.substr(6, 4));

                    var dayB = parseInt(b.date.substr(0, 2));
                    var monthB = parseInt(b.date.substr(3, 2));
                    var yearB = parseInt(b.date.substr(6, 4));

                    var dateA = new Date(currentYear, monthA - 1, dayA);
                    var dateB = new Date(currentYear, monthB - 1, dayB);

                    if (dateA < today) {
                        dateA.setFullYear(currentYear + 1); // Set next year if the birthday has already occurred this year
                    }
                    if (dateB < today) {
                        dateB.setFullYear(currentYear + 1);
                    }

                        return (dateA - dateB) * (ascending ? 1 : -1);
                });
            },
            editBirthday(birthday:any) {
                this.birthdayToEdit = birthday;
                this.showManageDialog = true;

            },
            getServerName(serverId: string){
                    const server = this.servers.find(server => server.id === serverId);
                    return server?.name;
            },
            resetDialog() {
                this.imageDialog = {
                    height: '100px',
                    width: '100px',
                    imageLoading : true,
                    imageUrl: '',
                    show: false
                }
            },
            imageClicked(imageUrl: string) {
                this.imageDialog.imageUrl = imageUrl;
                this.imageDialog.show = true;
            },
            imageLoadedInDialog(){
                this.imageDialog.imageLoading = false;

            },
            toIndianString(date: Date|null|undefined) {
                return date?.toLocaleString('en-In')
            }
        }
    }

</script>
<style scoped>
    .dialog-image-preview{
        object-fit: scale-down;
        height: 80vh;
    }
</style>