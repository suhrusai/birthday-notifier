<template>
    <div class="main-container" :style="{  height: `${height}` }" @click="imageClicked()">
        <div class="loading-container" :style="{  height: `${height}` }" v-if="!imageLoaded">
            <v-progress-linear
            indeterminate
            color="yellow-darken-2"
            ></v-progress-linear>
        </div>  
        <div class="image-background" :style="{ backgroundImage: `url(${src})`, height: `${height}` }" v-if="imageLoaded"></div>
        <img :src="src" class="image" :style="{  height: `${height}` }" @load="onImageLoad" v-show="imageLoaded"/>
    </div>
    
</template>
<script lang="ts">
    export default {
        props: ['src', 'height'],
        data(){
            return {
                imageLoaded: false
            }
        },
        methods: {
            onImageLoad() {
                this.imageLoaded = true;
                console.log('image loaded');
            },
            imageClicked() {
                if(this.imageLoaded)
                    this.$emit('imageClicked');
            }
        }
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
    .loading-container{
        position: absolute;
        top: 0;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index : 10;
    }
    .image {
        aspect-ratio: 1/1;
        position: absolute;
        top:0;
        object-fit: scale-down;
    }
</style>