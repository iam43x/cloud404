
export function renderProfileTab(currentUser) {
    $('#profile-tab').append(
        `<div id="profile-info-form" class="text-center">
            <div class="input-group mb-3">
                <span class="input-group-text w-35" id="profile-id-span">ID</span>
                <input type="text" class="form-control" aria-describedby="profile-id-span" id="profile-id-input" value="#${currentUser.id}" readonly>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text w-35" id="">Username</span>
                <input type="username" class="form-control" id="profile-username-input" aria-describedby="emailHelp" placeholder="Enter email" value="${currentUser.name}" readonly>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text w-35" id="profile-password-span">Password</span>
                <input type="password" class="form-control" id="profile-password-input" aria-describedby="profile-password-span" placeholder="*******">
            </div>
            <button id="update-user-profile-button" type="submit" class="btn btn-outline-secondary">Update</button>
        </div>`
    )
    $('#update-user-profile-button').click(updateProfileInfo)
}

function updateProfileInfo() {
    //update profile to backend logic
}