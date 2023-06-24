<template>
  <v-app-bar flat app elevation="6" color="orange darken-2">
    <v-app-bar-title>
      <v-icon icon="mdi-cake" />
      Birthday Notifier
    </v-app-bar-title>
    <v-spacer />
    <v-btn
    href="/"
    >Home</v-btn>
    <v-btn
    href="/servers"
    >Servers</v-btn>
    <v-btn
    href="/birthdays"
    >Birthdays</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.nav-bar {
  margin-bottom: 100px;
}
</style>