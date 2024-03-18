import { logOut } from "./auth.js"
import { showLogInModal } from "./login.js"

export function renderNavbar() {
    $('body').prepend(
        `<nav class="navbar navbar-dark bg-dark">
            <div id="navbar-panel" class="container-fluid justify-content-space">
                <a class="navbar-brand mx-1" href="#">Control Center</a>
                <button id="login-modal-btn" class="btn btn-outline-secondary my-2 my-sm-0 mx-3" type="button">Log In</button>
            </div>
        </nav>`
    )
    $('#login-modal-btn').click(showLogInModal)
    $(window).click(() => { $('#collapse-navbar').collapse('hide') })
}

export function updateNavbar(currentUser) {
    if(currentUser) {
        $('#login-modal-btn').remove()
        $('#user-info-container').append(
            `<span class="text-secondary">${currentUser.name}#${currentUser.id}</span>`
        )
        $('#navbar-panel')
            .prepend(
                `<button id="collapse-navbar-btn" class="navbar-toggler mx-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-navbar" aria-controls="collapse-navbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>`
            )
            .append(
                `<button id="logout-btn" class="btn btn-outline-secondary my-2 my-sm-0 mx-1" type="button">Log Out</button>`
            )
        $('#logout-btn').click(logOut)
    }
}