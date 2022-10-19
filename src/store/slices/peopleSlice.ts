import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index';
import proxie from '../proxie';

const initialState = {
  people: [],
  status: 'idle'
}

export const fetchPeople = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await proxie.get('/users');
  return response.data
})

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    deletePeople: (state, action) => {
      state.people?.filter((a:any)=>a.id !== action.payload.id);
    }
  },
  extraReducers:(builder) =>{
    builder
    // .addCase(fetchPeople.fulfilled, (state, action) => {
    //   return action.payload;
    // })
    .addCase(fetchPeople.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchPeople.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.people = state.people.concat(action.payload)
    })
    .addCase(fetchPeople.rejected, (state, action) => {
      state.status = 'failed'
    })
  }
});

export const { deletePeople } = peopleSlice.actions;

export const selectPeople = (state: RootState) => state.people.people;

export default peopleSlice.reducer