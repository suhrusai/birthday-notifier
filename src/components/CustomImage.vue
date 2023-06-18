<template>
    <div class="main-container" :style="{  height: `${height}` }" >
        <div class="image-background" :style="{ backgroundImage: `url(${src})`, height: `${height}` }"></div>
        <img :src="src" class="image" :style="{  height: `${height}` }"/>
    </div>
    
</template>
<script lang="ts">
    export default {
        props: ['src', 'height']
    }
</script>
<style scoped>
    .main-container {
        position:relative;
    }   
    .image-background {
        position: absolute;
        top: 0;
        aspect-ratio: 1/1;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        filter: blur(1px);
    }
    .image {
        aspect-ratio: 1/1;
        position: absolute;
        top:0;
        object-fit: scale-down;
    }
</style>