<template>
    <v-card
        variant="tonal"
        width="320"
        class="pa-3 ma-2"
    >
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
                        v-if="servers.length == 0 || fetchingServers"
                        indeterminate
                        color="yellow-darken-2">
                    </v-progress-circular>
                    <span v-if="!fetchingServers">{{ getServerName(serverId) }}</span>
                </v-chip>
            </v-card-text>
            <slot name="actions"></slot>
    </v-card>
    <v-dialog v-model="imageDialog.show" width="auto">
        <ImageDialog :src="birthday.imageUrl"  :key="birthday.imageUrl"></ImageDialog>
    </v-dialog>
</template>
<script lang="ts">
import Birthday from '@/models/Birthday';
import { useAppStore } from '@/store/app';
import { toRef } from 'vue';
import CustomImage from '@/components/CustomImage.vue';
import { storeToRefs } from 'pinia';
import ImageDialog from '@/components/ImageDialog.vue';
import { ref } from 'vue';
import { computed } from 'vue';

export default{
    props: {
        birthday: {
            type: Object as () => Birthday,
            required: true
        }
    },
    components: {
        CustomImage,
        ImageDialog
    },
    setup(props){
        console.log(props.birthday)
        const imageDialog = ref({
            height: '100px',
            width: '100px',
            imageLoading : true,
            imageUrl: '',
            show: false
        })
        const isWidthTooSmall = computed(() => window.innerWidth<576);
        const appStore = useAppStore();
        const appStoreRefs = storeToRefs(appStore);
        const birthdays = appStoreRefs.birthdays;
        const servers = appStoreRefs.servers;
        const fetchingServers = appStoreRefs.fetchingServers
        // const fetchingServers = appStore.fetchingServers;
        // const servers = appStore.servers;
        const imageClicked = (imageUrl: string) => {
            imageDialog.value.show = true;
            imageDialog.value.imageUrl = imageUrl;
        }

        const getServerName = (serverId: string) => {
            if(servers.value == null || servers.value == undefined || servers.value.length == 0)
                return '';
            return servers.value.filter(server => server.id == serverId)[0].name
        }
        return {
            fetchingServers,
            getServerName,
            servers,
            imageClicked,
            imageDialog,
            isWidthTooSmall
        }
    }
}
</script>