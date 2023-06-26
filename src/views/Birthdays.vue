<template>
    <h2 class="mb-4 mx-5">Birthdays</h2>
    <v-row class="mx-3">
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
    <v-progress-linear
        v-if="fetchingBirthdays"
        indeterminate
        color="yellow-darken-2"
    ></v-progress-linear>
    <div class="d-flex flex-wrap justify-center"  v-if="fetchBirthdays">
        <template  v-for="birthday in birthdays" :key="birthday.id">
            <BirthdayCard :birthday="birthday">
                <template v-slot:actions>
                    <v-btn color="primary" variant="text" @click="editBirthday(birthday)">
                    Edit
                    </v-btn>
                </template>
            </BirthdayCard>
        </template>
    </div>
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
    import BirthdayCard from '@/components/Birthday/BirthdayCard.vue';
    import { useAppStore } from '@/store/app';
    import ImageDialog from '@/components/ImageDialog.vue';
import { storeToRefs } from 'pinia';
import { clone } from '@/customUtilities';
    const birthdayService = new BirthdayService();
    const serverService = new ServerService();
    const appStore = useAppStore();
    const appStoreRefs = storeToRefs(appStore)
    export default {
        setup(){
            return {
                appStore: appStore
            }
        },
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
        }),
        components: {
            AddBirthdayForm,
            BirthdayCard,
        },
        watch:{
            'choosenSort': {
                handler: function(val, oldVal) {
                    this.applySort(val);
                }
            }
        },
        async beforeMount() {
            appStore.$reset();
            await this.fetchBirthdays();
        },
        computed:{
            placeholderImageUrl(){
                return require('@/assets/');
            }
        },
        methods: {
            async fetchBirthdays(){
                appStore.$reset();
                this.fetchingBirthdays = true;
                this.birthdays = [];
                this.birthdays = await birthdayService.getBirthdays() as Birthday[];
                await appStore.fetchBirthdays();
                this.birthdays = clone(appStore.birthdays);
                this.applySort(this.choosenSort);
                await appStore.fetchServers();
                this.servers = clone(appStore.servers);
                this.fetchingBirthdays = false;
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