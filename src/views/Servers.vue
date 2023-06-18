<template>

    <v-container>
        <div class="">
            <div class="d-flex justify-end">
                <v-btn 
                    color = "transparent"
                    append-icon="mdi-refresh"
                    class="mr-2"
                    @click="fetchServers"
                    :disabled="fetchingServers">
                    Refresh
                </v-btn>
                <v-btn 
                    color = "primary"
                    append-icon="mdi-plus"
                    @click="addServerDialog = true">
                    Add Server
                </v-btn>
            </div>
        </div>
        
        <div class="flex-fill" v-if="fetchingServers">
        <div class="text-center">
            <v-progress-circular
                indeterminate
                color="primary"
            />
        </div>
        </div>
        <div class="d-flex my-2 flex-wrap" v-if="!fetchingServers">
            <div v-for="server in servers" class="mr-2 mb-2" :key="server.id">
                <v-btn @click="showModifySever(server)">{{ server.name }}</v-btn>
            </div>
        </div>
        <v-dialog  v-model="addServerDialog">
            <AddServerDialogForm v-on:submit="addServerDialogSubmitted()"/>
        </v-dialog>
        <v-dialog  v-model="modifyServerDialog">
            <ModifyServerDialogForm :server="serverToModify" @submit="modifyServerDialogSubmitted"/>
        </v-dialog>
    </v-container>

</template>
<script lang="ts">
    import ServerService from '@/backend/ServerService';
    import Server from '@/models/Server';
    import AddServerDialogForm from '@/components/Server/AddServerForm.vue';
    import ModifyServerDialogForm from '@/components/Server/ModifyServerForm.vue';
import { QuerySnapshot } from '@firebase/firestore';
    let servers: Server[] = [];
    export default {
        data: () => ({
            servers: servers,
            serverToModify: new Server("","",""),
            addServerDialog: false,
            modifyServerDialog: false,
            fetchingServers: false
        }),
        components: {
            AddServerDialogForm,
            ModifyServerDialogForm
        },
        beforeMount() {
            this.fetchServers();
        },
        methods: {
            async fetchServers() {
                this.fetchingServers = true;
                this.servers = [];
                let serverService: ServerService = new ServerService();
                let resSnapshot:QuerySnapshot = await serverService.readServers()
                resSnapshot.forEach((document : any) => {
                    const server: Server = document.data();
                    console.log(server)
                    this.servers.push(server)
                });
                this.fetchingServers = false;
            },
            addServerDialogSubmitted() {
                this.addServerDialog = false;
                this.fetchServers();
            },
            modifyServerDialogSubmitted() {
                this.modifyServerDialog = false;
                this.fetchServers();
            },
            showModifySever(server: Server) {
                this.modifyServerDialog = true;
                this.serverToModify = server;
            }
        }
    }
</script>

