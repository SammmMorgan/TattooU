<template>
    <div class="position-relative">
        <button type="button" class="border-0 bg-0 fs-md-1 fs-2 heart-button position-absolute z-1"
            style="background-color:transparent">🤍</button>
        <img :src="tattoo.fullURL" alt="" class="gallery-tattoo gallery-tattoo-sm mt-3">
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
.gallery-tattoo {
    height: 35vh;
    aspect-ratio: 1/1;
}

.heart-button {
    position: absolute;
    top: 1vh;
    right: 1vh;
}

@media (max-width: 768px) {
    .gallery-tattoo-sm {
        height: 15vh;
        aspect-ratio: 1/1;
    }
}
</style>