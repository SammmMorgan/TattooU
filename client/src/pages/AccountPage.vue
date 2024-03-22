<template>
  <!-- <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
    <div class="d-flex flex-column text-center">
      <h1>> Back</h1>
    
    </div>
  </router-link>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.bio }}</p>
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid"> -->
  <section class="row">
  </section>

  <section class="container-fluid">
    <div class="row">
      <div class="col-12 position-relative p-0">
        <img :src="account.coverImg" alt="" style="width: 100%; height: 40vh; object-fit: cover;">
        <img :src="account.picture" alt="" class="profile-icon">
        <span class="mdi mdi-cog fs-1 setting"></span>
        <router-link :to="{ name: 'Home' }" style="height: 0;"><span
            class="mdi mdi-arrow-left-bold fs-1 back"></span></router-link>
      </div>






      <div class="col-6 m-auto">

        <form @submit.prevent="updateAccount()">

          <div class="mb-3">
            <label for="name">Name</label>
            <input v-model="editableAccountData.name" class="w-100" type="text" id="name">
          </div>

          <div class="mb-3">
            <label for="name">Bio</label>
            <input v-model="editableAccountData.bio" class="w-100" type="text" id="bio">
          </div>

          <div class="mb-3">
            <label for="picture">Picture</label>
            <input v-model="editableAccountData.picture" class="w-100" type="text" id="picture">
          </div>



          <div class="mb-3">
            <label for="email">Email</label>
            <input v-model="editableAccountData.email" id="email" type="text" class="w-100">
          </div>


          <button class="btn btn-success">Update Account</button>

        </form>
      </div>








    </div>
  </section>





  <div class="container">
    <section class="row justify-content-evenly" v-for="collection in collections" :key="collection.id">
      <div class="col-4">
        <img :src="collection.coverImg" :alt="collection.title">
      </div>
    </section>
  </div>

  {{ collections }}

</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';
import { collectionService } from '../services/CollectionService.js';
import { logger } from '../utils/Logger.js';

export default {
  setup() {
    const account = computed(() => AppState.account)
    const editableAccountData = ref({})
    watch(account, () => { editableAccountData.value = { ...account.value } }, { immediate: true })

    onMounted(() => { getCollectionsByAccountId(account.value.id) })

    async function getCollectionsByAccountId(id) {
      try {
        await collectionService.getCollectionsByAccountId(id)
        logger.log('Account', id)
      } catch (error) {
        Pop.error(error)
      }
    }


    return {
      editableAccountData,
      collections: computed(() => AppState.collections),
      account: computed(() => AppState.account),

      async updateAccount() {
        try {
          await accountService.updateAccount(editableAccountData.value)
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
}
</script>

<style scoped>
.profile-icon {
  position: absolute;
  top: 290px;
  left: 50%;
  height: 150px;
  width: 150px;
  border-radius: 50%;
}

.setting {
  position: absolute;
  top: 0;
  right: 20px;
}

.back {
  position: absolute;
  top: 0;
  left: 20px;
}
</style>
