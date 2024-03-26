import { renderModalLoginForm } from "./modules/login.js"
import { renderNavbar, updateNavbar } from "./modules/navbar.js"
import { renderTabs } from "./modules/tabs.js"
import { tryGetCurrentUser } from "./modules/auth.js"

$(document).ready(async () => {
    renderModalLoginForm()
    renderNavbar()
    tryGetCurrentUser()
        .then(currentUser => {
            renderTabs(currentUser)
            updateNavbar(currentUser)
        })
})