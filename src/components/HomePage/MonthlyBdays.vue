<template>
    <v-container>
        <v-card>
            <v-card-title>
                <h2>Birthdays in {{ monthName }}</h2>
            </v-card-title>
        </v-card>
    </v-container>
</template>
<script lang="ts">
import { getCurrentMonthName } from '@/backend/TimeService';
export default {
    computed:
    {
        monthName()
        {
            return getCurrentMonthName(this.month);
        }
    }
}
</script>