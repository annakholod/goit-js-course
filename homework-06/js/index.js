"use strict";

class Notepad {
  constructor(notes) {
    this._notes = notes;
  }

  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  };

  get notes() {
    return this._notes;
  };

  findNoteById(id) {
    for(const note of this._notes) {
      if(note.id === id) {
        return note;
      }
    }
  };

  saveNote(note) {
    this._notes.push(note);
  };

  deleteNote(id) {
    const note = this.findNoteById(id);
    if(!note) return;
    this._notes.splice(this._notes.indexOf(note), 1);
  };

  // notepad.updateNoteContent('id-3', {
  //   title: 'Get comfy with React.js or Vue.js',
  // });

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    const newNote = Object.assign(note, updatedContent);
    return newNote;
  };

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = priority;
  };

  filterNotesByQuery(query) {
    const newNotepad = {
      notes: []
    };
    let queryLowerCase = query.toLowerCase();
    for (const note of this._notes) {
      let titleLowerCase = note.title.toLowerCase();
      let bodyLowerCase = note.body.toLowerCase();
      if (titleLowerCase.includes(query) || bodyLowerCase.includes(query)) {
        newNotepad.notes.push(note);
      }
    }
    return newNotepad;
  };

  filterNotesByPriority(priority) {
    const newNotepad = {
      notes: []
    };
    for (const note of this._notes) {
      if (note.priority === priority) {
        newNotepad.notes.push(note);
      }
    }
    return newNotepad;
  };
}

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: Notepad.Priority.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: Notepad.Priority.NORMAL,
  },
];

const notepad = new Notepad(initialNotes);

/*
  Смотрю что у меня в заметках после инициализации
*/
console.log('Все текущие заметки: ', notepad.notes);

/*
 * Добавляю еще 2 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: 'id-3',
  title: 'Get comfy with Frontend frameworks',
  body:
    'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: Notepad.Priority.NORMAL,
});

notepad.saveNote({
  id: 'id-4',
  title: 'Winter clothes',
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: Notepad.Priority.LOW,
});

console.log('Все текущие заметки: ', notepad.notes);

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority('id-4', Notepad.Priority.NORMAL);

console.log('Заметки после обновления приоритета для id-4: ', notepad.notes);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority('id-3', Notepad.Priority.LOW);

console.log('Заметки после обновления приоритета для id-3: ', notepad.notes);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery('html'),
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery('javascript'),
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
  'Отфильтровали заметки по нормальному приоритету: ',
  notepad.filterNotesByPriority(Notepad.Priority.NORMAL),
);

/*
 * Обновим контент заметки с id-3
 */
notepad.updateNoteContent('id-3', {
  title: 'Get comfy with React.js or Vue.js',
});

console.log(
  'Заметки после обновления контента заметки с id-3: ',
  notepad.notes,
);

/*
 * Повторил HTML и CSS, удаляю запись c id-2
 */
notepad.deleteNote('id-2');
console.log('Заметки после удаления с id -2: ', notepad.notes);
