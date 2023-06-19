<template>
    <v-card>
    <v-card-title class="ml-3 mt-3">
        <span class="text-h5">Add Server</span>
    </v-card-title>
    <v-card-text>
        <v-container-fluid>
        <v-form>
            <v-text-field label="Server Name" v-model="server.name"></v-text-field>
            <v-text-field label="Server Id" v-model="server.serverId"></v-text-field>
            <v-text-field label="Channel Name" v-model="server.channelName"></v-text-field>
            <v-text-field label="Channel Id" v-model="server.channelId"></v-text-field>
            <v-btn 
            color="primary" 
            :loading="isSending"
            @click="saveServer">
                Save
            </v-btn>
        </v-form>
        </v-container-fluid>
    </v-card-text>
    </v-card>
</template>
<script lang="ts">
import ServerService from '@/backend/ServerService';
import Server from '@/models/Server';
let serverService: ServerService = new ServerService();
    export default {
        data: () => ({
            server: new Server("","","","",""),
            isSending : false,
        }),
        methods: {
            async saveServer() {
                this.isSending = true;
                await serverService.addServer(this.server);
                this.isSending = false;
                this.$emit('submit');
            }
        }
    }
</script>