<template>
    <img :src="imageUrl" class="image" :style="styleObject" @load="onImageLoad" v-if="attemptLoadImage"/>
</template>

<script lang="ts">
import { convertHeicToDataUrl } from '@/plugins/heic2any';

export default{
    props: ['src', 'height'],
    data(){ 
        return {
            attemptLoadImage: false,
            imageUrl : ''
        }
    },
    methods: {
        onImageLoad() {
            console.log('image loaded ImageTag')
            this.$emit('imageLoaded');
        },
    },
    async mounted(){
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
    computed:{
        styleObject(){
            if(this.height == null || this.height == undefined || this.height == '')
                return {
                }
            return {
                height: `${this.height}`
            }
        }
    }
}
</script>