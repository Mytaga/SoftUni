import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

async function getAllCars(){
    return api.get('/data/cars?sortBy=_createdOn%20desc')
};

async function createCar(data){
    return api.post('/data/cars', data);
};

async function getCarById(id){
    return api.get('/data/cars/' + id)
};

async function editCar(id, data){
    return api.put('/data/cars/' + id, data);
};

async function deleteCarById(id){
    return api.del('/data/cars/' + id)
};

async function getMyCars(userId){
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
};

async function searchCarByYear(year){
    return api.get(`/data/cars?where=year%3D` + year);
}

export {
    login,
    register,
    logout,
    getAllCars,
    createCar,
    getCarById,
    editCar,
    deleteCarById,
    getMyCars,
    searchCarByYear
}