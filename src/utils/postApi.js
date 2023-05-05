
import tokenService from "./tokenService";
const BASE_URL = '/api/posts/';

export function create(data){
    return fetch(BASE_URL, {
        method: 'POST',
        body: data,
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
        }
    }).then(responseFromTheServer => {
        if(responseFromTheServer.ok) return responseFromTheServer.json()
        throw new Error('Something went wrong in create post in postApi')
    })
}

export function getAll(){
    return fetch(BASE_URL, {
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}