import tokenService from "./tokenService";

const BASE_URL = '/api/'

export function create(postId){
    return fetch(`${BASE_URL}posts/${postId}/favorites`, {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function removeFavorite(favoriteId){
    return fetch(`${BASE_URL}favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
        }
    }).then(res => res.json())
}