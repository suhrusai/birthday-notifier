<template>
    <v-card>
    <v-card-title class="ml-3 mt-3">
        <span class="text-h5">Edit Server</span>
    </v-card-title>
    <v-card-text>
        <v-container-fluid>
        <v-form>
            <v-text-field label="Server Id" v-model="updatedServer.id" disabled></v-text-field>
            <v-text-field label="Server Name" v-model="updatedServer.name"></v-text-field>
            <v-text-field label="Webhook URL" v-model="updatedServer.webhookUrl"></v-text-field>
            <v-btn 
            color="primary" 
            :loading="isSending"
            @click="updateServer">
                Update
            </v-btn>
        </v-form>
        </v-container-fluid>
    </v-card-text>
    </v-card>
</template>
<script lang="ts">
    import ServerService from '@/backend/ServerService';
    import Server from '@/models/Server';
    import { clone } from '@/customUtilities';
    let serverService: ServerService = new ServerService();
    export default {
        props: { 
            server: {
                type: Server,
                required: true
            }
        },
        // setup(props) {
        // // setup() receives props as the first argument.
        //     serverToBeUpdated = props.server
        // },
        data: () => ({
            updatedServer: new Server("","",""),
            isSending : false,
        }),
        beforeMount() {
            this.updatedServer = clone(this.server);
        },
        methods: {
            async updateServer() {
                this.isSending = true;
                await serverService.updateServer(this.updatedServer);
                this.isSending = false;
                this.$emit('submit');
            }
        }
    }
</script>