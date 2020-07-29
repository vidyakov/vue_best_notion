<template>
    <div class="new-note">
        <label>Title<input type="text" v-model="note.title" :placeholder="placeholder"></label>
        <label>Text<textarea v-model="note.text"/></label>
        <div class="forms">
            <button @click="saveNote(note)" class="btn btnPrimary">Save</button>
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
        data () {
            return {
                note: null,
                priorities: null,
                placeholder: null,
            }
        },
        created () {
            this.setDefault()
        },
        methods: {
            saveNote (note) {
                if (note.title === '') {
                    this.placeholder = 'Please, enter the title'
                } else {
                    this.$store.dispatch('saveNewNote', note);
                    this.setDefault();
                }
            },
            changePriority(color) {
                this.note.priority = color;
                for (let priority of this.priorities) {
                    priority.checked = priority.color === color;
                }
            },
            setDefault() {
                this.placeholder = '';
                this.note = Object.assign({}, this.$store.getters.getDefaultNewNote);
                this.priorities = [...this.$store.getters.getDefaultPriorities]
            }
        },
    }
</script>
