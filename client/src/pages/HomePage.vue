<template>
  <!--   <div class="container-fluid home">
    <img src="/img/ff5fa50773f34d47537a05ee1d376bf8.png" alt="CodeWorks Logo" class="mt-5 home-card">
    <div class="row">
      <div class="col-12">
        <Login />
      </div>
    </div>
    <section class="row">
      <div class="col-12 justify-content-center d-flex gradient">
      </div>
    </section>
  </div>
  <div class="ad-text container-fluid">
    <section class="row">
      <div class="col-12 d-none d-md-block justify-content-between d-flex p-0">
        <img src="/img/efd39f25f6090206a1a549861dd52273.png" alt="" class="content-img">
        <p class="text-white fs-1 text-center flavor-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quia
          reprehenderit similique
          ducimus magnam sit
          possimus aspernatur nisi fuga corrupti assumenda.</p>
      </div>
    </section>
  </div>

 NOTE gallery component abstracted 

  <div class="gallery bg-black">
    <section class="row">
      <div v-for="tattoo in tattoos" :key="tattoo.id" class="col-12">
        <TattooCardComponent :tattoo="tattoo" />
      </div>
    </section>
  </div> -->

  <section class="container-fluid home-background">
    <div class="row">
      <img src="/img/ff5fa50773f34d47537a05ee1d376bf8.png" alt="Logo" class="logo">
    </div>
    <div class="bg-black"></div>
  </section>

  <div class="container-fluid black pt-5 text-center">
    <div class="row">
      <div v-for="tattoo in tattoos" :key="tattoo.id" class="col-md-3">
        <TattooCardComponent :tattoo="tattoo" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { tattoosService } from '../services/TattoosService.js';
import { AppState } from "../AppState.js"
import TattooCardComponent from '../components/TattooCardComponent.vue';
import Pop from '../utils/Pop.js';
export default {
  setup() {

    onMounted(() => {
      getAllTattoos()
    })

    async function getAllTattoos() {
      try {
        await tattoosService.getAllTattoos()

      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      tattoos: computed(() => AppState.tattoos)


    }
  },
  components: { TattooCardComponent }
}
</script>

<style scoped lang="scss">
.home-background {
  user-select: none;
  background-image: url(/img/1b63c07362e3fbafb0425f6bfaf76014.png);
  min-height: 100dvh;
}

.home-background:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, black 100%);
}

.black {
  background-color: black;
}

.logo {
  // width: clamp(400px, 50vw, 100%);
  position: absolute;
  height: 100vh;
  width: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}


.gradient {
  background: rgb(97, 97, 97);
  background: linear-gradient(180deg, rgba(97, 97, 97, 0) 0%, rgba(0, 0, 0, 0.5439425770308124) 30%, rgba(0, 0, 0, 1) 100%);
  height: 500px;
  width: 100%;
  position: absolute;
  top: 50vh;
  right: 0;
  left: 0;

}

.ad-text {
  background-color: black;
}

.content-img {
  width: 45vh;
  height: 35dvh;
}
</style>