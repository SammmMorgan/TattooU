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

  <section class="container-fluid">
    <div class="row justify-content-center align-items-center rowH">
      <div class="col-10 text-center">
        <div class="spinner-border text-white" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </section>



  <!-- REVIEW DO NOT REMOVE | animation for beginning-->
  <div class="screen">


    <section class="container-fluid home-background">
      <div class="text-end p-5">
        <Login />
      </div>
      <div class="row">
        <img src="/img/ff5fa50773f34d47537a05ee1d376bf8.png" alt="Logo" class="logo">
      </div>
      <div class="bg-black"></div>
    </section>

    <section class="container-fluid black py-5">
      <div class="row align-items-center justify-content-evenly text-center">
        <div class="col-md-5">
          <img
            src="https://images.unsplash.com/photo-1605647533135-51b5906087d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="" style="height: 40vh;">
        </div>
        <div class="col-md-5 text-center">
          <h1 style="font-size: 64px;" class="font">Find the perfect tattoo for you!</h1>
        </div>
      </div>
    </section>

    <div class="container-fluid black pt-5 text-center py-5">
      <form @submit.prevent="searchImages()" class="d-flex w-100 justify-content-center py-5 text-white" role="search">
        <input class="search-input me-2 w-50" type="search" placeholder="Search" v-model="searchQuery.name"
          aria-label="Search">
        <button class="search-button" type="submit">Search</button>
      </form>
      <div class="row">
        <div v-for="tattoo in tattoos" :key="tattoo.id" class="col-md-3">
          <TattooCardComponent :tattoo="tattoo" />
        </div>
      </div>
      <button class="btn" @click="this.getMoreImages()">
        <span class="text-center text-primary fs-3" type="button">Load more Tats</span>
      </button>
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h1>Create a collection</h1>

            <form @submit.prevent="createCollection(likedImage)">
              <div class="mb-3">
                <input v-model="editableCollectionData.title" type="text" class="form-control" placeholder="Name..">
              </div>
              <div class="mb-3">
                <input v-model="editableCollectionData.coverImg" type="text" class="form-control"
                  placeholder="Cover Image Url...">
              </div>
              <div class="mb-3 text-end">
                <button type="submit" class="btn btn-success">Create</button>
              </div>
            </form>

            <h1 class="my-3">Add to an existing collection</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { tattoosService } from '../services/TattoosService.js';
import { AppState } from "../AppState.js"
import TattooCardComponent from '../components/TattooCardComponent.vue';
import Pop from '../utils/Pop.js';
import { collectionService } from '../services/CollectionService.js';
import { logger } from '../utils/Logger.js';
import { useRoute, useRouter } from 'vue-router';
export default {
  setup() {
    const searchQuery = ref({ name: '' })
    const route = useRoute()
    const router = useRouter()
    const editableCollectionData = ref({ title: '', coverImg: '' })
    onMounted(() => {
      getAllTattoos()
    })
    async function getAllTattoos(query) {
      try {
        await tattoosService.getAllTattoos(query)

      } catch (error) {
        Pop.error(error)
      }
    }


    watch(() => route.query, () => {
      getAllTattoos(route.query)
    }, { immediate: true })


    return {
      async searchImages() {
        try {
          router.push({ query: searchQuery.value })
        } catch (error) {
          Pop.error(error)
        }
      },
      searchQuery,
      editableCollectionData,
      tattoos: computed(() => AppState.tattoos),
      likedImage: computed(() => AppState.likedImage),
      setPageNum: computed(() => AppState.currentPage),


      async createCollection(image) {
        logger.log(image)
        try {
          const newCollection = await collectionService.createCollection(editableCollectionData.value, image)
          editableCollectionData.value = { title: '', coverImg: '' }
        } catch (error) {
          Pop.error(error)
        }
      },
    }
  },
  async getMoreImages() {
    try {
      let newPage = this.setPageNum++
      await tattoosService.getMoreTats({ newPage })
    } catch (error) {
      Pop.error(error)
    }
  },
  components: { TattooCardComponent }
}
</script>

<style scoped lang="scss">
.rowH {
  padding-top: 80vh;
  height: 100vh;
  background-color: black;
  animation: FadeOut 2s forwards ease-in;
  animation-delay: 2s;
  animation-iteration-count: 1;
}

@keyframes FadeOut {
  0% {
    background-color: black;
  }

  100% {
    display: none;
  }
}

.screen {
  animation: FadeIn 2s forwards ease-in;
  animation-delay: 0s;
  animation-iteration-count: 1;
  z-index: 999;
  background-color: black;
}

@keyframes FadeIn {
  0% {
    opacity: 0;

  }

  100% {
    opacity: 1;
  }
}

.home-background {
  user-select: none;
  background-image: url(/img/1b63c07362e3fbafb0425f6bfaf76014.png);
  min-height: 100dvh;
}

.home-background:after {
  content: '';
  position: absolute;
  height: 50vh;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, black 100%);
}

.search-input {
  border-bottom: 2px solid white !important;
  background-color: black;
  padding: 10px;
  border: none;
  color: white;
}

.search-button {
  padding: 10px;
  font-family: "Anonymous Pro", monospace;
  font-weight: 400;
  background-color: black;
  border: 2px solid white;
  border-radius: 16px;
  font-size: 20px;
  margin-left: 50px;
  transition: 0.3s ease-in-out;
  color: white;
}

.search-button:hover {
  background-color: white;
  color: black;
}

.search-input::placeholder {
  font-size: 26px;
  font-style: italic;
  color: rgb(194, 194, 194);
  font-family: "Anonymous Pro", monospace;
  font-weight: 400;
}

.search-input:focus {
  outline: none;
}

.font {
  font-family: "Shrikhand", serif;
  font-weight: 400;
  font-style: normal;
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
  z-index: 2;
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