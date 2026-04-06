import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:2000'

const booksSlice = createSlice({
    name: 'books',
    initialState: [],
    reducers:{
        setBooks: (state, action) => {
            return action.payload;
        },
        addBook: (state, action) => {
            state.push(action.payload);
        },
        editBook: (state, action) => {
            const index = state.findIndex(b => b.ISBN === action.payload.ISBN);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteBook: (state, action) => {
            const index = state.findIndex(b=> b.ISBN === action.payload);
            if (index !== -1){
                state.splice(index, 1);
            }
        }
    }
})

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getBooks = (dispatch) => {
  api.get('/books')
    .then(res => {
      dispatch(setBooks(res.data));
      console.log('data', res.data)
    })
}

export const addBooks = (dispatch, book)=> {
  const res = api.post('/books', book);
  dispatch(addBook(book));
  return res.data;
}

export const editBooks = (dispatch, book) => {
  const res = api.patch(`/books/${book.ISBN}`, book);
  console.log(res)
  console.log(res.data)
  dispatch(editBook(book));
  return res.data;
}

export const deleteBooks = (dispatch, ISBN) => {
  const res = api.delete(`/books/${ISBN}`);
  dispatch(deleteBook(ISBN));
  return res.data;
}



export const {setBooks, addBook, editBook, deleteBook} = booksSlice.actions;
export default booksSlice.reducer;