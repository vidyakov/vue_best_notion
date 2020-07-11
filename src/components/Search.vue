<template>
    <div class="my-wrapper">
        <input type="text" v-model="search" :placeholder="placeholder">
    </div>
</template>

<script>
    export default {
        name: "Search",
        props: {
            value: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                search: this.value
            }
        },
        watch: {
            search(value) {
                this.$emit('search', value);
            }
        }
    }
</script>

<style scoped>
    .my-wrapper input {
        margin: 0;
    }
</style>
