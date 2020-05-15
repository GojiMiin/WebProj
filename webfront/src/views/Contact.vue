<template>
  <div class="home">
    <Menubar />
    <v-img :src="require('@/assets/BG.jpg')">
      <div class="text-center">
        <v-container class="base">
          <v-sheet color="rgb(0, 0, 0, 0)">
            <div class="display-1">This Project presented by <br /></div>
            <div class="title">
              <br />
              1. Supachet Arunsuksiri 6013127 EGCO <br />
              2. Supasak Premkusolchai 6013129 EGCO <br />
            </div>
          </v-sheet>
        </v-container>
      </div>
    </v-img>
  </div>
</template>

<script>
import Menubar from "../components/menubar";
export default {
  name: "Contact",
  components: {
    Menubar
  }
};
</script>

<style scoped>
.v-text-field {
  width: 10%;
}
.container.base {
  width: 70%;
}
</style>
