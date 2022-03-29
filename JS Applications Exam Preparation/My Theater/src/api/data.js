import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

async function getAllEvents(){
    return api.get('/data/theaters?sortBy=_createdOn%20desc&distinct=title')
};

async function createEvent(data){
    return api.post('/data/theaters', data);
};

async function getEventById(id){
    return api.get('/data/theaters/' + id)
};

async function editEvent(id, data){
    return api.put('/data/theaters/' + id, data);
};

async function deleteEventById(id){
    return api.del('/data/theaters/' + id)
};

async function getMyEvents(userId){
    return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
};

async function addLike(theaterId){
    return api.post('/data/likes', theaterId);
};

async function getAllLikes(theaterId){
    return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`)
}

export {
    login,
    register,
    logout,
    getAllEvents,
    createEvent,
    getEventById,
    editEvent,
    deleteEventById,
    getMyEvents,
    addLike,
    getAllLikes
}