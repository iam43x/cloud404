import { logIn } from "./auth.js"

export function renderModalLoginForm() {
    $('body').append(
        `<div class="modal modal-sm fade bg-dark" id="login-modal" role="dialog" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <form class="form-login text-center">
                            <img id="login-img" src="./img/login-img.svg">
                            <div class="input-group">
                                <span class="input-group-text w-35" id="login-username-span">Username</span>
                                <input type="username" id="login-username-input" class="form-control">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text w-35" id="login-password-span">Password</span>
                                <input type="password" id="login-password-input" class="form-control">
                            </div>
                            <button id="login-btn" class="btn btn-outline-dark btn-lg btn-block" type="button">
                                <span>Log In</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>    
        </div>`
    )
    $('#login-btn').click(logIn)
}

export function showLogInModal() {
    $('#login-modal').modal('show')
}

export function hideLogInModal() { 
    $('#login-modal').modal('hide')
 }