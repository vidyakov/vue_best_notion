<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <newNote />
    <div class="controls">
      <search
              :value="search"
              :placeholder="search_placeholder"
              @search="search = $event"
      />
      <div class="controls">
        <span @click="activeGrid = true" :class="{active: activeGrid}">Grid</span>
        <span @click="activeGrid = false" :class="{active: !activeGrid}">Table</span>
      </div>
    </div>
    <notes
            :notes="notesFilter"
            :active="activeGrid"
    />
  </div>
</template>

<script>
  import newNote from '@/components/NewNote.vue'
  import notes from '@/components/Notes.vue'
  import search from '@/components/Search.vue'


  export default {
    components: {
      notes, newNote, search
    },
    data() {
      return {
        title: "Best notion",
        notes: null,
        activeGrid: true,
        search: '',
        search_placeholder: 'Find your note'
      }
    },
    created() {
      this.notes = this.$store.getters.getNotesList;
    },

    computed: {
      notesFilter() {
        let array = this.notes;
        let search = this.search;

        if (this.search) {
          search = search.trim().toLowerCase();
          array = array.filter((item) => {
            if (item.title.toLowerCase().indexOf(search) !== -1) return item;
          })
        }
        return array;
      }
    }
  }
</script>

<style>
  #app {
    width: 600px;
    margin: 100px auto;
  }
</style>
