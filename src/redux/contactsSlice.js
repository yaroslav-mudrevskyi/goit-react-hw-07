import { createSlice } from "@reduxjs/toolkit";
import { addContact, fetchContacts, deleteContact } from "./contactsOps";
import { handleFulfilled, handlePending, handleRejected } from "./handlers";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addMatcher(({ type }) => type.endsWith("pending"), handlePending)
      .addMatcher(({ type }) => type.endsWith("fulfilled"), handleFulfilled)
      .addMatcher(({ type }) => type.endsWith("rejected"), handleRejected);
  },
});

export const contactsReducer = slice.reducer;
