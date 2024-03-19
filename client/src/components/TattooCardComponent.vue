<template>
    <div class="container">
        <img :src="tattoo.fullURL" alt="" class="img-fluid my-3">
        <!-- <button type="button" class="border-0 bg-0 fs-md-1 fs-2 heart-button z-1"
            style="background-color:transparent">🤍</button> -->
        <span class="mdi mdi-heart heart-button fs-1"></span>
    </div>
</template>


<script>
import { Tattoo } from '../models/Tattoo.js';

export default {
    props: { tattoo: { type: Tattoo, required: true } },
    setup() {
        return {}
    }
}
</script>



<style lang="scss" scoped>
.container {
    position: relative;
}

img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
    border-radius: 15px;
    display: block;
}

.heart-button {
    position: absolute;
    top: 0;
    right: 20px;
}

@media (max-width: 768px) {
    .gallery-tattoo-sm {
        height: 15vh;
        aspect-ratio: 1/1;
    }
}
</style>