import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

async function getAllBooks(){
    return api.get('/data/books?sortBy=_createdOn%20desc');
};

async function createBook(data){
    return api.post('/data/books', data);
};

async function getBookById(id){
    return api.get('/data/books/' + id);
};

async function editBook(id, data){
    return api.put('/data/books/' + id, data);
};

async function deleteBookById(id){
    return api.del('/data/books/' + id);
};

async function getMyBooks(userId){
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
};

async function addLike(bookId){
    return api.post('/data/likes', {bookId});
};

async function getAllLikes(bookId){
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export {
    login,
    register,
    logout,
    getAllBooks,
    createBook,
    getBookById,
    editBook,
    deleteBookById,
    getMyBooks,
    addLike,
    getAllLikes
}