<template>
    <v-container>
        <v-card>
            <v-card-title>
                <h2>Birthdays in {{ currentMonthName }}</h2>
            </v-card-title>
            <div class="d-flex align-center align-content-center justify-center py-12 my-12" v-if="fetchingBirthdays">
                <div>
                    <v-progress-circular
                indeterminate
                color="amber"

                ></v-progress-circular>
                </div>
            </div>

            <v-slide-group
            class="pa-4"
            selected-class="bg-success"
            show-arrows
            >
                <v-slide-group-item v-for="birthday in birthdaysInMonth" :key="birthday.id">
                    <birthday-card :birthday="birthday" :key="birthday.id"></birthday-card>
                </v-slide-group-item>
            </v-slide-group>
        </v-card>
    </v-container>
</template>
<script lang="ts">
import { getCurrentMonthName } from '@/backend/TimeService';
import { useAppStore } from '@/store/app';
import BirthdayCard from '@/components/Birthday/BirthdayCard.vue';
import { computed, onMounted } from 'vue';
import Birthday from '@/models/Birthday';
import Server from '@/models/Server';
import { storeToRefs } from 'pinia';
const appStore = useAppStore();
const monthIndex = new Date().getMonth()
export default {
    components:{
        BirthdayCard
    },
    setup() {
        const {birthdays: birthdays , servers: servers ,fetchingBirthdays: fetchingBirthdays} = storeToRefs(appStore);
        const currentMonthName = getCurrentMonthName()
        const birthdaysInMonth:Birthday[] = computed(() => {
            const filteredBdays = appStore.birthdays.filter(bday => {
            const [day, month, year] = bday.date.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            return date.getMonth() === monthIndex;
        })
        const sortedDates = filteredBdays.sort((a, b) => {
            const [dayA] = a.date.split('-');
            const [dayB] = b.date.split('-');
                return parseInt(dayA)- parseInt(dayB);
        });
        return sortedDates;
    })
    onMounted(() => {
        appStore.fetchBirthdays();
        appStore.fetchServers();
    })
    return {
            currentMonthName,
            birthdaysInMonth,
            fetchingBirthdays
        }
    }
}
</script>