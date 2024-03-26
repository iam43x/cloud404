import * as api from "./api.js"

let currentUser

export function logIn() { 
    let usernameInput = $('#login-username-input')
    let passwordInput = $('#login-password-input')
    let auth = {
        username: usernameInput.val().toLowerCase(),
        password: passwordInput.val()
    }
    usernameInput.val('')
    passwordInput.val('')
    api.getToken(auth)
        .then(resp => resp.json())
        .then(user => {
            //initialize currentUser
            currentUser = {
                id: user.id,
                name: user.username,
                comment: "...",
                token: user.token
            }
            /** hmm enough secure? */
            localStorage.setItem('token', currentUser.token)
            location.reload()
        })
}

export function logOut() {
    currentUser = null
    localStorage.removeItem('token')
    location.reload()
}

export async function tryGetCurrentUser() {
    if(!currentUser) {
        await fetchUserInfo()
    }
    return currentUser
}

function fetchUserInfo() {
    let token = localStorage.getItem('token')
    
    if(token) {
        return api.getContext()
            .then(resp => resp.json())
            .then(user => {
                currentUser = {
                    id: user.id,
                    name: user.username,
                    comment: '...',
                    token: token
                }
            })
    }
}