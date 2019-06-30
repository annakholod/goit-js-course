'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
  constructor(notes) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    const note = this._notes.find(item => item.id === id);
  }

  saveNote(note) {
    this._notes.push(note);
  }

  deleteNote(id) {
    this._notes = this._notes.filter(item => item.id !== id);
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    const newNote = Object.assign(note, updatedContent);
    return newNote;
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = priority;
  }

  filterNotesByQuery(query) {
    const notes = [];
    let queryLowerCase = query.toLowerCase();
    for (const note of this._notes) {
      let titleLowerCase = note.title.toLowerCase();
      let bodyLowerCase = note.body.toLowerCase();
      if (titleLowerCase.includes(queryLowerCase) || bodyLowerCase.includes(queryLowerCase)) {
        notes.push(note);
      }
    }
    return notes;
  }

  filterNotesByPriority(priority) {
    const notes = [];
    for (const note of this._notes) {
      if (note.priority === priority) {
        notes.push(note);
      }
    }
    return notes;
  }

  priorityDefault() {
    return PRIORITY_TYPES.LOW;
  }
}

const notepad = new Notepad(initialNotes);

const noteList = document.querySelector('.note-list');

const createNoteContent = note => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = note.title;
  noteContent.append(noteTitle);

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = note.body;
  noteContent.append(noteBody);

  return noteContent;
};

const createActionButton = (dataAction, iconCont) => {
  const button = document.createElement('button');
  button.classList.add('action');
  button.dataset.action = NOTE_ACTIONS[dataAction];

  const icon = document.createElement('i');
  icon.classList.add('material-icons', 'action__icon');
  icon.textContent = ICON_TYPES[iconCont];
  button.append(icon);

  return button;
};

const createNoteFooter = note => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const noteSectionPriority = document.createElement('section');
  noteSectionPriority.classList.add('note__section');
  noteFooter.append(noteSectionPriority);

  noteSectionPriority.append(
    createActionButton('DECREASE_PRIORITY', 'ARROW_DOWN')
  );
  noteSectionPriority.append(
    createActionButton('INCREASE_PRIORITY', 'ARROW_UP')
  );

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${note.priority}`;
  noteSectionPriority.append(notePriority);

  const noteSectionChange = noteSectionPriority.cloneNode(false);
  noteFooter.append(noteSectionChange);

  noteSectionChange.append(createActionButton('EDIT', 'EDIT'));
  noteSectionChange.append(createActionButton('DELETE', 'DELETE'));

  return noteFooter;
};

const createListItem = note => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = note.id;

  const divNote = document.createElement('div');
  divNote.classList.add('note');
  listItem.append(divNote);

  divNote.append(createNoteContent(note));
  divNote.append(createNoteFooter(note));

  return listItem;
};

const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => createListItem(item));
  listRef.append(...listItems);
};

renderNoteList(noteList, initialNotes);

// add note
const formNoteEditor = document.querySelector('.note-editor');
const noteTitle = formNoteEditor.querySelector(`[name='note_title']`);
const noteBody = formNoteEditor.querySelector(`[name='note_body']`);

const addListItem = (listRef, note) => {
  const newNote = createListItem(note);
  listRef.append(newNote);
};

const addNote = (evt) => {
  evt.preventDefault();
  if(noteTitle.value === '' || noteBody.value === '') {
    alert('Необходимо заполнить все поля!');
  } else {
    const note = {
      id: generateUniqueId(),
      title: noteTitle.value,
      body: noteBody.value,
      priority: notepad.priorityDefault(),
    }
    notepad.saveNote(note);
    addListItem(noteList, note);

    formNoteEditor.reset();
  }
};

formNoteEditor.addEventListener('submit', addNote);

// delete note
const removeListItem = item => {
  const note = item.closest('.note-list__item');
  const noteId = note.dataset.id;
  notepad.deleteNote(noteId);
  note.remove();
};

const handleListClick = ({ target }) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;
  const action = target.parentNode.dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeListItem(target);
      break;
  }
};

noteList.addEventListener('click', handleListClick);

// serch
const serchFormInput = document.querySelector('.search-form__input');

const serchByQuery = () => {
  const filteredNotes = notepad.filterNotesByQuery(serchFormInput.value);
  noteList.innerHTML = '';
  renderNoteList(noteList, filteredNotes);
};

serchFormInput.addEventListener('input', serchByQuery);
