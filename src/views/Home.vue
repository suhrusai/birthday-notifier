<template>
  <div>
    <v-tabs
      bg-color="primary"
      v-model="tab"
    >
      <v-tab value="one">Servers</v-tab>
      <v-tab value="two">Birthdays</v-tab>
    </v-tabs>
  <v-window v-model="tab">
        <v-window-item value="one">
          <Servers/>
        </v-window-item>
        <v-window-item value="two">
          <Birthdays></Birthdays>
        </v-window-item>
  </v-window>
</div>


</template>

<script lang="ts">
  // import HelloWorld from '@/components/HelloWorld.vue'
  import Servers from '@/views/Servers.vue'
  import CustomImage from '@/components/CustomImage.vue'
  import Birthdays from '@/views/Birthdays.vue'
  export default{
    data(){
      return {
        tab: null,
      }
    },
    components: {
      Servers,
      CustomImage,
      Birthdays
    }

  }
</script>
