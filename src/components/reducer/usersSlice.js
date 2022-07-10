import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users : [],
  currentPage: 1,
  currentUserId: -1,
  currentUser: {},
};

export const usersReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id == action.payload.id,
      );
      if (index === -1) {
        state.users = [
          ...state.users,
          {
            id: action.payload.id,
            avatar: action.payload.avatar,
            email: action.payload.email,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
          },
        ];
      }
    },
    addUser: (state, action) => {
      state.users = [
        {
          id: action.payload.id,
          avatar: action.payload.avatar,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
        ...state.users,
      ];
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload.id;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.user;
    },

    editCurrentUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id == action.payload.id,
      );

      //TODO maybe change this
      state.users[index].firstName = action.payload.first_name;
      state.users[index].lastName = action.payload.last_name;
    },

    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },

    nextPage: (state, action) => {
      state.currentPage = action.payload.page;
    },
  },
});

export const {
  storeUser,
  addUser,
  removeUser,
  nextPage,
  setCurrentUserId,
  setCurrentUser,
  editCurrentUser,
} = usersReducer.actions;

export const getUsers = (state) => state.usersReducer.users;
export const getCurrentUserId = (state) => state.usersReducer.currentUserId;
export const getCurrentUser = (state) => state.usersReducer.currentUser;
export const getCurrentPage = (state) => state.usersReducer.currentPage;

export default usersReducer.reducer;
