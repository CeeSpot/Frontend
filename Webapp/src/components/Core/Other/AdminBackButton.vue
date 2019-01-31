<template>
    <button class="fab fab-fixed red">
       <font-awesome-icon icon="chevron-left"/>
    </button>
</template>

<script>
  export default {
    name: "admin-back-button",
    props: ['target']
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
    cursor: pointer;
}

.fab-fixed{
    position: fixed;
    top: 110px;
    left: 0;
    margin-bottom: 20px;
    margin-left: 40px;
    z-index: 9999;
}

.red{
    background: #E60000;
}

.red:hover{
    background: #FF2C2C;
}
</style>