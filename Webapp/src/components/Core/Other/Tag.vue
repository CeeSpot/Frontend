<template>
    <form method="get" action="/community" style="display: inline;">
        <input type="hidden" name="tag" :value="id">
        <button type="submit">{{ name }}</button>
    </form>
</template>

<script>
  export default {
    name: "tag",
    props: ['id', 'name']
  }
</script>

<style scoped>
    button {
        margin-top: 4px;
        border: 2px solid #E60000;
        border-radius: 15px;
        background-color: transparent;
        color: #E60000;
        height: 30px;
        line-height: 15px;
        text-align: center;
        min-width: 70px;
        font-weight: 500;
        padding: 5px;
        margin-right: 8px;
        cursor: pointer;
    }

    button:hover {
        transition: 0.2s;
        background-color: #E60000;
        color: white;
    }
    button:not(:hover) {
        transition: 0.2s;
    }
</style>