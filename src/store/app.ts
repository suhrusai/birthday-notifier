// Utilities
import Birthday from '@/models/Birthday'
import Server from '@/models/Server'
import { defineStore } from 'pinia'
import BirthdayService from '@/backend/BirthdayService';
import ServerService from '@/backend/ServerService';
const birthdayService = new BirthdayService();
const serverService = new ServerService();
export const useAppStore = defineStore('app', {
  state: () => ({
    birthdays: [] as Birthday[],
    servers: [] as Server[],
    fetchingServers: false,
    fetchingBirthdays: false,
  }),
  actions: {
    async fetchBirthdays() {
      this.fetchingBirthdays = true;
      const birthdays =  await birthdayService.getBirthdays();
      this.birthdays = birthdays;
      this.fetchingBirthdays = false;
    },
    async fetchServers() {
      this.fetchingServers = true;
      const servers = await serverService.readServers();
      this.servers = servers;
      this.fetchingServers = false;
    }
  }
})
