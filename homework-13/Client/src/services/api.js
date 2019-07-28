const URL = 'http://localhost:3000/notes';

export const getNotes = () => {
  return fetch(URL).then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Error while fetching ' + response.statusText);
  })
};

export const addNote = note => {
  const sett = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(note)
  };
  return fetch(URL, sett).then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Error while fetching ' + response.statusText);
  })
};

export const delNote = id => {
  const sett = {
    method: 'DELETE'
  }
  return fetch(`${URL}/${id}`, sett).then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Error while fetching ' + response.statusText);
  })
};
