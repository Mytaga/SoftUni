import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

async function getAllPets(){
    return api.get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
};

async function createPet(data){
    return api.post('/data/pets', data);
};

async function getPetById(id){
    return api.get('/data/pets/' + id);
};


async function deletePetById(id){
    return api.del('/data/pets/' + id);
};

async function editPet(id, data){
    return api.put('/data/pets/' + id, data);
};

async function addDonation(petId){
    return api.post('/data/donation', {petId});
};

async function getDonation(petId){
    return api.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export {
    login,
    register,
    logout,
    getAllPets,
    createPet,
    getPetById,
    deletePetById,
    editPet,
    addDonation,
    getDonation
}