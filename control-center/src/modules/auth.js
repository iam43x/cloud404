let currentUser

export function logIn() { 
    const usernameInput = $('#login-username-input')
    const passwordInput = $('#login-password-input')
    const auth = {
        username: usernameInput.val().toLowerCase(),
        password: passwordInput.val()
    }
    usernameInput.val('')
    passwordInput.val('')
    //send auth request to backend >>>>>
    //initialize currentUser
    currentUser = {
        id: 1001,
        name: auth.username,
        comment: "testing features...",
        token: "testStubToken",
        refreshToken: "testStubRefreshToken"
    }
    /** remove if backend integration is done! */
    localStorage.setItem('user_id', currentUser.id)
    localStorage.setItem('user_comment', currentUser.comment)
    localStorage.setItem('user_name', currentUser.name)
    localStorage.setItem('token', currentUser.token)
    localStorage.setItem('refresh_token', currentUser.refreshToken)
    location.reload()
}

export function logOut() {
    currentUser = null
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_comment')
    localStorage.removeItem('user_name')
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    location.reload()
}

export function tryGetCurrentUser() {
    if(!currentUser) {
        fetchUserInfo()
    }
    return currentUser
}

function fetchUserInfo() {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refresh_token')
    
    if(token && refreshToken) {
        //logic backend call...
        currentUser = {
            id: localStorage.getItem('user_id'),
            name: localStorage.getItem('user_name'),
            comment: localStorage.getItem('user_comment'),
            token: token,
            refreshToken: refreshToken
        }
    }
}