<template>
    <div class="d-flex flex-wrap justify-center">
        <v-card
        variant="tonal"
        width="320"
        class="pa-3 ma-2"
         v-for="birthday in birthdays" :key="birthday.id" >
            <CustomImage :src="birthday.imageUrl" height="300px"></CustomImage>
            <v-card-title>
                {{ birthday.name }}
            </v-card-title>
            <v-card-title>
                {{ toIndianString(birthday.date?.toDate()) }}
            </v-card-title>
        </v-card>
    </div>
</template>
<script lang="ts">
    import CustomImage from '@/components/CustomImage.vue';
    import BirthdayService from '@/backend/BirthdayService';
    import Birthday from '@/models/Birthday';
    const birthdayService = new BirthdayService();
    export default {
        data: () => ({
            birthdays: new Array<Birthday>()
        }),
        components: {
            CustomImage
        },
        async beforeMount() {
            let birthdaysSnapshot = await birthdayService.getBirthdays()
            birthdaysSnapshot.forEach((document : any) => {
                const birthday: Birthday = document.data();
                this.birthdays.push(birthday)
                console.log(birthday)
            });
        },
        methods: {
            toIndianString(date: Date|null|undefined) {
                return date?.toLocaleString('en-In')
            }
        }
    }
</script>