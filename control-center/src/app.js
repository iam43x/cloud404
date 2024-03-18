import { renderModalLoginForm } from "./modules/login.js"
import { renderNavbar, updateNavbar } from "./modules/navbar.js"
import { renderTabs } from "./modules/tabs.js"
import { tryGetCurrentUser } from "./modules/auth.js"

$(document).ready(() => {
    renderModalLoginForm()
    renderNavbar()
    const currentUser = tryGetCurrentUser()
    if(currentUser) {
        renderTabs()
        updateNavbar(currentUser)
    }
})