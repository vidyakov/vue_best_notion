<template>
    <div class="notes">
        <div class="note" :class="[note.priority, {full: active}]" v-for="(note, index) in notes">
            <span @click="remove(index)" class="delete">x</span>
            <!--Title-->
            <h3
                    class="note-title"
                    v-if="!note.editing_title"
                    @click="editTitleMode(note)">{{ note.title }}</h3>
            <input
                    v-else
                    type="text"
                    :ref="note.title.replace(/ /g, '_')"
                    class="note-title new-title"
                    v-model="note.new_title"
                    v-on:keyup.esc="note.editing_title = false"
                    v-on:keyup.enter="saveTitle(note)">
<!--                    v-click-outside="note.editing_title = false"-->

            <!--Text-->
            <p
                    class="note-text"
                    v-if="!note.editing_text"
                    @click="editTextMode(note)">{{ note.text }}</p>
            <input
                    v-else
                    type="text"
                    :ref="note.text.replace(/ /g, '_')"
                    class="note-text"
                    v-model="note.new_text"
                    v-on:keyup.esc="note.editing_text = false"
                    v-on:keyup.enter="saveText(note)">
<!--                    v-click-outside="note.editing_text = false"-->
            <p class="note-date">{{ note.date }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            notes: {
                type: Array,
                required: true
            },
            active: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            remove(index) {
                this.$emit('remove', index)
            },
            makeDefaultEditing() {
                this.notes.forEach((note) => {
                    note.editing_text = false;
                    note.editing_title = false;
                });
            },
            editTitleMode(note) {
                this.makeDefaultEditing();
                note.new_title = note.title;
                note.editing_title = true;
                this.$nextTick(() => {
                    this.$refs[note.title.replace(/ /g, '_')][0].focus();
                });
            },
            editTextMode(note) {
                this.makeDefaultEditing();
                note.new_text = note.text;
                note.editing_text = true;
                this.$nextTick(() => {
                    this.$refs[note.text.replace(/ /g, '_')][0].focus();
                })
            },
            saveTitle(note) {
                if (note.new_title) {
                    note.editing_title = false;
                    note.title = note.new_title;
                    note.date = new Date(Date.now()).toLocaleString();
                }
            },
            saveText(note) {
                note.editing_text = false;
                note.text = note.new_text;
                note.date = new Date(Date.now()).toLocaleString();
            }
        }
    }
</script>

<style scoped lang="scss">
    .new-title {
        margin: 0;
        padding: 0;
        border: none;
        border-radius: 0;
    }

</style>
