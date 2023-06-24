// Utilities
import Birthday from '@/models/Birthday'
import { Server } from 'http'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    birthdays: [] as Birthday[],
    servers: [] as Server[],
    fetchingServers: false,
    fetchingBirthdays: false,
  }),
})
