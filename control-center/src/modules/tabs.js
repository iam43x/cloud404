import { renderProfileTab } from "./profile-action.js"
import { renderSettingsTab } from "./settings.js"

export function renderTabs() {
    $('body').append(
        `<div class="container-fluid p-0 table-responsive">
            <div class="collapse" id="collapse-navbar">
                <div id="user-info-container" class="bd-dark text-center"></div>
                <div class="bg-dark p-3">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <button id="nav-profile-tab" class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-tab" type="button" role="tab" aria-controls="profile-tab" aria-selected="true">Profile</button>
                        <button id="nav-settings-tab" class="nav-link" data-bs-toggle="tab" data-bs-target="#settings-tab" type="button" role="tab" aria-controls="settings-tab" aria-selected="false">Settings</button>
                        <button id="nav-statistics-tab" class="nav-link" data-bs-toggle="tab" data-bs-target="#statistics-tab" type="button" role="tab" aria-controls="statistics-tab" aria-selected="false">Statistics</button>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="profile-tab" role="tabpanel" aria-labelledby="nav-profile-tab"></div>
                <div class="tab-pane fade" id="settings-tab" role="tabpanel" aria-labelledby="nav-settings-tab"></div>
                <div class="tab-pane fade" id="statistics-tab" role="tabpanel" aria-labelledby="nav-statistics-tab"></div>
            </div>
        </div>`
    )
    renderProfileTab()
    renderSettingsTab()
}