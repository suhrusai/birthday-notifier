<template>
    <div class="d-flex flex-wrap justify-center">
        <v-card
        variant="tonal"
        width="320"
        class="pa-3 ma-2"
         v-for="birthday in birthdays" :key="birthday.id" >
            <CustomImage :src="birthday.imageUrl" height="300px" @imageClicked="imageClicked(birthday.imageUrl)"></CustomImage>
            <v-card-title>
                {{ birthday.name }}
            </v-card-title>
            <v-card-title>
                {{ birthday.date }}
            </v-card-title>
        </v-card>
    </div>
    <v-dialog v-model="imageDialog.show" width="auto">
        <v-card>
            <v-card-text v-show="!imageDialog.imageLoading" >
                <img :src="imageDialog.imageUrl" class="dialog-image-preview" @load="imageDialog.imageLoading=false"/>
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
</template>
<script lang="ts">
    import CustomImage from '@/components/CustomImage.vue';
    import BirthdayService from '@/backend/BirthdayService';
    import Birthday from '@/models/Birthday';
    const birthdayService = new BirthdayService();
    export default {
        data: () => ({
            birthdays: new Array<Birthday>(),
            imageDialog: {
                height: '100px',
                width: '100px',
                imageLoading : true,
                imageUrl: '',
                show: false
            }
        }),
        components: {
            CustomImage
        },
        async beforeMount() {
            this.birthdays = await birthdayService.getBirthdays();
        },
        methods: {
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