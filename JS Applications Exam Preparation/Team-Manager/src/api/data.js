import * as api from './api.js';

const login = api.login;
const register = api.register;
const logout = api.logout;

async function createTeam(data){
    return api.post('/data/teams', data);
};

async function getAllTeams(){
    return api.get('/data/teams')
};

async function getAllMembers(){
    return api.get('/data/members?where=status%3D%22member%22');
};

async function getTeamById(id){
    return api.get('/data/teams/' + id)
};

async function getMemebers(teamId){
    return api.get(`/data/members?where=teamId%3D%22${teamId}%22&amp;load=user%3D_ownerId%3Ausers`);
};

async function editTeam(id, data){
    return api.put('/data/teams/' + id, data);
};

async function getTeamsByMember(userId){
    return api.get(`/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%
    22&amp;load=team%3DteamId%3Ateams`)
}


export {
    login,
    register,
    logout,
    createTeam,
    getAllTeams,
    getAllMembers,
    getTeamById,
    getMemebers,
    editTeam,
    getTeamsByMember
}