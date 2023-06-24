<template>
    <v-lazy
        :min-height="200"
        :options="{'threshold':0.5}"
        transition="fade-transition"
    >
        <div class="main-container" :style="{  height: `${height}` }" @click="imageClicked()">
            <div class="loading-container" :style="{  height: `${height}` }" v-if="!imageLoaded">
                <v-progress-linear
                indeterminate
                color="yellow-darken-2"
                ></v-progress-linear>
            </div>
            <div v-if="attemptLoadImage">
                <div class="image-background" :style="{ backgroundImage: `url(${imageUrl})`, height: `${height}` }" v-if="imageLoaded"></div>
                <ImageTag :src="src" class="image" :style="{  height: `${height}` }" @imageLoaded="onImageLoad" v-show="imageLoaded"/>
            </div>  
            
        </div>
    </v-lazy>
</template>
<script lang="ts">
import {convertHeicToDataUrl} from '@/plugins/heic2any';
import ImageTag from './ImageTag.vue';
    export default {
        props: ['src', 'height'],
        data(){
            return {
                imageLoaded: false,
                imageUrl: '',
                attemptLoadImage: false,
            }
        },
        async mounted() {
            if(this.src == null || this.src == undefined || this.src == '')
                    return '';
                let copyOfLink = this.src as string;
                copyOfLink.toLowerCase();
                if(copyOfLink.toLocaleLowerCase().includes('.heic') == true){
                    console.log('heic image detected.Converting to jpg');
                    this.imageUrl = await convertHeicToDataUrl(this.src) as string
                    this.attemptLoadImage = true;
                    return;
                }
                this.imageUrl = this.src;
                this.attemptLoadImage = true;
                return;
            },
        components: {
            ImageTag
        },
        methods: {
            onImageLoad() {
                this.imageLoaded = true;
                console.log('image loaded')
            },
            imageClicked() {
                if(this.imageLoaded)
                    this.$emit('imageClicked');
            }
        },
        unmounted() {
            this.imageLoaded = false;
            this.imageUrl = '';
            this.attemptLoadImage = false;
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