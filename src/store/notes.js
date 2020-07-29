export default {
    state: {
        noteList: [
            {
                title: `Test note`,
                text: `Some text for note`,
                date: new Date(Date.now()).toLocaleString(),
                priority: 'light',
                new_title: '',
                new_text: '',
                editing_title: false,
                editing_text: false
            }
        ],
        priorities: [
            {color: 'light', checked: true},
            {color: 'regular', checked: false},
            {color: 'deep', checked: false},
        ],
        newNote: {
            title: '',
            text: '',
            priority: 'light',
            new_title: '',
            new_text: '',
            editing_title: false,
            editing_text: false
        }
    },
    mutations: {
        addNote (state, payload) {
            state.noteList.push(payload)
        },
        deleteNote (state, payload) {
            state.noteList.splice(payload, 1)
        }
    },
    actions: {
        saveNewNote (context, payload) {
            let noteToCommit = Object.assign({
                date: new Date(Date.now()).toLocaleString()
            }, payload);
            context.commit('addNote', noteToCommit);
        },
        removeNote (context, payload) {
            context.commit('deleteNote', payload)
        }
    },
    getters: {
        getNotesList(state) {
            return state.noteList
        },
        getDefaultPriorities (state) {
            return state.priorities
        },
        getDefaultNewNote (state) {
            return state.newNote
        },
        getFilteredNotes (state) {

        }
    }
}
