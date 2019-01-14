<template>
<button  v-if="icon == 'check'" class="fab" v-bind:class="color"><font-awesome-icon icon="check"/></button>
<button v-else class="fab" v-bind:class="color">{{icon}}</button>
</template>

<script>
  export default {
    name: "action-button",
    props: ['color', 'icon']
  }
</script>

<style scoped>
.fab {
    border: none;
    font-size: 2em;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: auto;
    -webkit-box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, .3);
    box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, .3);
    position: fixed;
    bottom: 0;
    right: 0;
    margin-bottom: 20px;
    margin-right: 20px;
    cursor: pointer;
}

.red{
    background: #E60000;
}

.red:hover{
    background: #FF2C2C;
}
</style>