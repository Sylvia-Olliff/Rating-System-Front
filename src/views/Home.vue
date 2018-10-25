<template>
  <div id="home">
    <b-container fluid class="pt-5">
      <b-row class="pt-5">
      </b-row>
      <b-row class="pt-5">
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <b-jumbotron bg-variant="transparent" text-variant="info" header="Rating System" lead-tag="strong" lead="Generate Quotes for trucking lanes within the continental U.S." />
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
  #home {
    height: 1000px;
    background-image: url("../assets/landingPage.png")
  }
</style>

