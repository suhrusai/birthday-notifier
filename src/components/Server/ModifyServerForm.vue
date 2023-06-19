<template>
    <v-card>
    <v-card-title class="ml-3 mt-3">
        <span class="text-h5">Edit Server</span>
    </v-card-title>
    <v-card-text>
        <v-container-fluid>
        <v-form>
            <v-text-field label="Entry Id" v-model="updatedServer.id" disabled></v-text-field>
            <v-text-field label="Server Name" v-model="updatedServer.name"></v-text-field>
            <v-text-field label="Server Id" v-model="updatedServer.serverId"></v-text-field>
            <v-text-field label="Channel Name" v-model="updatedServer.channelName"></v-text-field>
            <v-text-field label="Channel Id" v-model="updatedServer.channelId"></v-text-field>
            <v-btn 
            color="primary" 
            :loading="isSending"
            @click="updateServer">
                Update
            </v-btn>
            <v-btn 
            class="ml-2"
            color="red" 
            :loading="isSending"
            @click="showConfirmationDialog=true">
                Delete
            </v-btn>
        </v-form>
        </v-container-fluid>
    </v-card-text>
    <v-card-text>
        <v-dialog v-model="showConfirmationDialog">
            <v-card width="auto">
                <v-card-text>
                    Do you want to delete record
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                    class="ml-2"
                    color="red" 
                    :loading="isSending"
                    @click="deleteServer">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
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
            updatedServer: new Server("","","","",""),
            isSending : false,
            showConfirmationDialog: false
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
            },
            async deleteServer() {
                this.isSending = true;
                await serverService.deleteServer(this.updatedServer.id);
                this.isSending = false;
                this.$emit('submit');
            }
        }
    }
</script>