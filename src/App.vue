<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <newNote
            @saveNote="saveNewNote"
            @changePriority="changePriority"
            :note="note"
            :errorPlaceholder="placeholder"
            :priorities="priorities"
    />
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
            @remove="removeNote"
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
        placeholder: '',
        note: {title: '', text: '', priority: 'light'},
        notes: this.getTestNotes(3),
        activeGrid: true,
        priorities: [
          {color: 'light', checked: true},
          {color: 'regular', checked: false},
          {color: 'deep', checked: false},
        ],
        search: '',
        search_placeholder: 'Find your note'
      }
    },
    methods: {
      saveNewNote() {
        if (this.note.title === '') {
          this.placeholder = 'Please, enter the title';
        } else {
          this.placeholder = '';
          this.notes.push({
            title: this.note.title,
            text: this.note.text,
            priority: this.note.priority,
            date: new Date(Date.now()).toLocaleString(),
          });
          this.setDefaultNote();
        }
      },
      removeNote(index) {
        this.notes.splice(index, 1)
      },
      changePriority(color) {
        this.note.priority = color;
        for (let priority of this.priorities) {
          priority.checked = priority.color === color;
        }
      },
      setDefaultNote() {
        this.note.title = '';
        this.note.text = '';
        for (let priority of this.priorities) {
          priority.checked = priority.color === 'light';
        }
      },
      getTestNotes(len) {
        let testNotes = [];
        for (let i = 0; i < len; i++) {
          testNotes.push(
                  {
                    title: `Test note #${i}`,
                    text: `Some text for note #${i}`,
                    date: new Date(Date.now()).toLocaleString(),
                    priority: 'light',
                    new_title: '',
                    new_text: '',
                    editing_title: false,
                    editing_text: false,
                  }
          )
        }
        return testNotes;
      }
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
