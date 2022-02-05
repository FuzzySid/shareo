export const initialState={
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
};