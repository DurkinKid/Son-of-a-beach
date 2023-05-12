import tokenService from "./tokenService";

const BASE_URL = '/api/'

export function create(postId, data){
    return fetch(`${BASE_URL}posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({data}),
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export function removeComment(commentId){
    return fetch(`${BASE_URL}comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + tokenService.getToken()
        }
    }).then(res => res.json())
}