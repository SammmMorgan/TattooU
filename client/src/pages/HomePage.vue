<template>
  <div class="home flex-grow-1 d-flex flex-column">
    <div>
      <Login />
    </div>
    <div class="">
      <img src="../assets/img/ff5fa50773f34d47537a05ee1d376bf8.png" alt="CodeWorks Logo" class="mt-5 home-card">
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  user-select: none;
  background-image: url(../assets/img/1b63c07362e3fbafb0425f6bfaf76014.png);

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      margin-top: 10vh;
      object-fit: contain;
    }
  }
}
</style>
