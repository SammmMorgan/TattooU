<template>
  <div class="home flex-grow-1 d-flex flex-column">
    <div>
      <Login />
    </div>
    <div class="container-fluid">
      <section class="row">
        <div class="col-12 justify-content-center d-flex">
          <img src="../assets/img/ff5fa50773f34d47537a05ee1d376bf8.png" alt="CodeWorks Logo" class="mt-5 home-card">
        </div>
      </section>
    </div>
  </div>
  <div class="gradient">
  </div>
  <div class="buttons">

  </div>
  <div class="gallery">

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
  object-position: center;

  .home-card {
    width: clamp(400px, 50vw, 100%);
    object-fit: cover;
    z-index: 999;
  }
}

.gradient {
  background: rgb(97, 97, 97);
  background: linear-gradient(180deg, rgba(97, 97, 97, 0) 0%, rgba(0, 0, 0, 0.5439425770308124) 30%, rgba(0, 0, 0, 1) 100%);
  height: 500px;
  width: 100%;
  position: absolute;
  top: 42vh;
  right: 0;
  left: 0;

}

//     >img {
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       margin-top: 10vh;
//       object-fit: contain;</style>
