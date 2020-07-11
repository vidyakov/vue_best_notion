<template>
    <div class="new-note">
        <label>Title<input type="text" v-model="note.title" :placeholder="errorPlaceholder"></label>
        <label>Text<textarea v-model="note.text"></textarea></label>
        <div class="forms">
            <button @click="saveNote" class="btn btnPrimary">Save</button>
            <div class="form-radio">
                <label :for="obj.color" v-for="obj in priorities" :key="obj.color" :class="[obj.color, {activeRadio: obj.checked}]">
                    <input
                            type="radio"
                            name="priority"
                            :id="obj.color"
                            @change="changePriority(obj.color)"
                    >
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            note: {
                type: Object,
                required: true,
            },
            errorPlaceholder: {
                type: String,
                required: true
            },
            priorities: {
                type: Array,
                required: true
            }
        },
        methods: {
            saveNote() {
                this.$emit('saveNote', this.note)
            },
            changePriority(color) {
                this.$emit('changePriority', color)
            },
        },
    }
</script>
