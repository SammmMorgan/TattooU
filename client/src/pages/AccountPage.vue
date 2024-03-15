<template>
  <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
    <div class="d-flex flex-column align-items-center">
      <h1>Home</h1>
      <!-- <img alt="logo" src="../assets/img/cw-logo.png" height="45" /> -->
    </div>
  </router-link>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.bio }}</p>
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid">
    <section class="row">
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
    </section>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';

export default {
  setup() {
    const account = computed(() => AppState.account)
    const editableAccountData = ref({})

    watch(account, () => { editableAccountData.value = { ...account.value } }, { immediate: true })


    return {
      editableAccountData,
      account,
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
img {
  max-width: 100px;
}
</style>
