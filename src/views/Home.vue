<template>
  <div>
    <v-tabs
      bg-color="primary"
      v-model="tab"
    >
      <v-tab value="one">Servers</v-tab>
      <v-tab value="two">Birthdays</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>
  <v-window v-model="tab">
        <v-window-item value="one">
          <Servers/>
        </v-window-item>
        <v-window-item value="two">
          <CustomImage src="https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg" height="300px"/>
          <Birthdays></Birthdays>
        </v-window-item>
        <v-window-item value="three">
          <AddBirthdayForm></AddBirthdayForm>
        </v-window-item>
  </v-window>
</div>


</template>

<script lang="ts">
  // import HelloWorld from '@/components/HelloWorld.vue'
  import Servers from '@/views/Servers.vue'
  import CustomImage from '@/components/CustomImage.vue'
  import Birthdays from '@/views/Birthdays.vue'
  import AddBirthdayForm from '@/components/Birthday/AddBirthdayFrom.vue'
  export default{
    data(){
      return {
        tab: null,
      }
    },
    components: {
      AddBirthdayForm,
      Servers,
      CustomImage,
      Birthdays
    }

  }
</script>
