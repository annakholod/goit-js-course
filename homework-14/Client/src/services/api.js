const URL = 'http://localhost:3000/notes';

export const getNotes = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch {
    console.log(error);
  }
};

export const addNote = async note => {
  const sett = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(note)
  };
  try {
    const response = await fetch(URL, sett);
    const data = await response.json();
    return data;
  } catch {
    console.log(error);
  }
};

export const delNote = async id => {
  const sett = {
    method: 'DELETE'
  };
  try {
    const response = await fetch(`${URL}/${id}`, sett);
  } catch {
    console.log(error);
  }
};
