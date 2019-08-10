const Notepad = require('../js/app');

const Priority = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: Priority.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: Priority.NORMAL,
  },
];

describe('methods of class Notepad', () => {
  let notepad;
  beforeEach(() => {
    notepad = new Notepad(initialNotes);
  });

  it('has initial notes', () => {
    expect(notepad._notes).toEqual(initialNotes);
  })

  it('find note by id', () => {
    const serchNote = {
      id: 'id-1',
      title: 'JavaScript essentials',
      body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
      priority: Priority.HIGH
    };
    const note = notepad.findNoteById('id-1');
    expect(note).toStrictEqual(serchNote);
  })

  it('save note', () => {
    const newNote = {
      id: 'id-3',
      title: 'New note',
      body: 'Body of new note',
      priority: Priority.LOW
    };
    notepad.saveNote(newNote);
    expect(notepad._notes.length).toBe(3);
  })

  it('delete note', () => {
    notepad.deleteNote('id-3');
    expect(notepad._notes.length).toBe(2);
  })

  it('update note content', () => {
    const updatedContent = {
      title: 'New title',
      body: 'New body'
    };
    const updatedNote = {
      id: 'id-2',
      title: 'New title',
      body: 'New body',
      priority: Priority.NORMAL
    };
    const note = notepad.updateNoteContent('id-2', updatedContent);
    expect(note).toStrictEqual(updatedNote);
  })

  it('update note priority', () => {
    const note = notepad.updateNotePriority('id-1', Priority.NORMAL);
    expect(note.priority).toBe(1);
  })

  it('filter notes by query', () => {
    const finalNotepad = {
      notes: [
        {
          id: 'id-1',
          title: 'JavaScript essentials',
          body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
          priority: Priority.NORMAL,
        }
      ]
    };
    const newNotepad = notepad.filterNotesByQuery('comfortable with all basic');
    expect(newNotepad).toMatchObject(finalNotepad);
  })

  it('filter notes by priority', () => {
    const newNotepad = notepad.filterNotesByPriority(Priority.NORMAL);
    let i = 0;
    for(const note of newNotepad.notes) {
      i += 1;
    }
    expect(i).toBe(2);
  })
})
