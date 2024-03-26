export function getToken(auth) {
    const credentials = btoa(auth.username.concat(':').concat(auth.password))
    return fetch("/api/getToken", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`
        }
    })
}

export function getAllUsers() {
    return fetch("/api/getAllUsers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token()}`
        }
    })
}

export function addUser(user) {
    return fetch("/api/addUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token()}`
        },
        body: JSON.stringify(user)
    })
}

export function getContext() { 
    return fetch("/api/getContext", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token()}`
        }
    })
}

function token() { return localStorage.getItem('token') }