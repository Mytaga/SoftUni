
import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

function getAlbums(){
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
};

function createAlbum(data){
    return api.post('/data/albums', data);
};

function getAlbumById(id){
    return api.get('/data/albums/'+ id);
};

function deleteAlbum(id){
    return api.del('/data/albums/'+ id);
};

async function editAlbum(id, data) {
    return api.put('/data/albums/' + id, data);
};

async function searchAlbum(song){
    return api.get(`/data/albums?where=name%20LIKE%20%22${song}%22`);
}

export {
    login,
    register,
    logout,
    getAlbums,
    createAlbum,
    getAlbumById,
    deleteAlbum,
    editAlbum,
    searchAlbum
}