import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postTask = createAsyncThunk("postTask", async (taskData) => {
  try {
    const response = await axios.post("http://localhost:4000/tasks",taskData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("postTask has failed", error.response.data.message);
  }
});

export const getTasks = createAsyncThunk("getTasks", async () => {
  try {
    const response = await axios.get("http://localhost:4000/tasks");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("taskData get has failed", error.response.data.message);
  }
});

export const updateTasks = createAsyncThunk("updateTasks", async ({id, taskData}) => {
  try {
    const response = await axios.put(`http://localhost:4000/tasks/${id}`, taskData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("taskData update has failed", error.response.data.message);
  }
});

export const deleteTasks = createAsyncThunk("getTasks", async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4000/tasks/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("taskData delete has failed", error.response.data.message);
  }
});

export const toDoSlice = createSlice({
  name: "toDo",
  initialState: {
    allTask: [],
    isError: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
       .addCase(getTasks.fulfilled, (state, action) => {
        state.allTask = {...action.payload}
       })
       .addCase(getTasks.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on get method");
       })
  },
});

// export const {  } = toDoSlice.actions

export default toDoSlice.reducer;
