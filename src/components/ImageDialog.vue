<template>
    <v-card>
        <v-card-text v-show="!imageLoading">
            <ImageTag :src="src" class="dialog-image-preview" @imageLoaded="imageLoaded()"/>
        </v-card-text>
        <v-card-text v-if="imageLoading">
            <v-progress-circular
            indeterminate
            color="yellow-darken-2"
            class="text-center align-middle"
            ></v-progress-circular>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { inject, ref } from 'vue';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import ImageTag from './ImageTag.vue';
const appStore = useAppStore();
export default {
    props: ['src'],
  setup(){
    const imageLoading = ref(true);
    const imageLoaded = () => {
        imageLoading.value = false;
    }
    return {
        imageLoading,
        imageLoaded,
    }
  },
    components: {
        ImageTag
  }
}
</script>
<style scoped>
    .dialog-image-preview{
        object-fit: scale-down;
        height: 80vh;
    }
</style>