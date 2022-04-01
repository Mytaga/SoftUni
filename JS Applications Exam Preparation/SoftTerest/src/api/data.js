import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

async function getAllIdeas() {
    return api.get('/data/ideas?select=_id%2Ctitle%2Cimg&amp;sortBy=_createdOn%20desc');
}

async function createIdea(data) {
    return api.post('/data/ideas', data);
}

async function getIdeaDetails(id) {
    return api.get('/data/ideas/' + id);
} 

async function deleteIdea(id) {
    return api.del('/data/ideas/' + id);
}

export {
    login,
    register,
    logout,
    getAllIdeas,
    createIdea,
    getIdeaDetails,
    deleteIdea
}   