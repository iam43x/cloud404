//user stub
export function renderAddUserModal() {
    $('body').append(
        `<div class="modal fade" id="addUserModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add User</h5>
                    </div>
                    <div class="modal-body text-center">
                        <div class="input-group mb-3">
                            <label class="input-group-text w-30" for="server-info">Server</label>
                            <select class="form-select" id="server-info">
                                <option selected>DemoServer_1</option>
                                <option>DemoServer_2</option>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-30" id="username-describe-span">Username</span>
                            <input type="text" class="form-control" id="username-info" aria-describedby="username-describe-span">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-30" id="password-describe-span">Password</span>
                            <input type="password" class="form-control" id="password-info" aria-describedby="password-describe-span">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text w-30" id="comment-describe-span">Comment</span>
                            <input type="text" class="form-control" id="comment-info" aria-describedby="comment-describe-span">
                        </div>
                        <button id="add-user-btn" type="submit" class="btn btn-outline-dark">Update</button>
                    </div>
                </div>
            </div>
        </div>`
    )
    $('#add-user-btn').click(addUserHandle)
}

export function renderAllUser() {
    fetch('/api/getAllUsers',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.json())
    .then(userList => {
        insertToTableRow(
            userList
                .map(usr => 
                    `<tr>
                        <th scope="row">${usr.id}</th>
                        <td>${usr.username}</td>
                        <td>${usr.server}</td>
                        <td>${usr.comment}</td>
                        ${actionColumn(usr.id)}
                    </tr>`
                ) 
                .join('\n')
        )
        userList.forEach(usr => addRemoveUserEventListener(usr.id))
    })
}

function addUserHandle(event) {
    let usernameInput = $('#username-info')
    let passwordInput = $('#password-info')
    let serverInput = $('#server-info')
    let commentInput = $('#comment-info')
    let user = {
        username: usernameInput.val(),
        password: passwordInput.val(),
        server: serverInput.val(),
        comment: commentInput.val()
    }
    // clean value input
    usernameInput.val('')
    passwordInput.val('')
    serverInput.val(serverInput.find('option:first').val())
    commentInput.val('')
    fetch("/api/addUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(resp => {
        insertToTableRow(
            `<tr>
                <th scope="row">${resp.id}</th>
                <td>${user.username}</td>
                <td>${user.server}</td>
                <td>${user.comment}</td>
                ${actionColumn(user.id)}
            </tr>`
        )
        addRemoveUserEventListener(user.id)
        $('#addUserModal').modal('hide')
    })
}

function insertToTableRow(rowContent) {
    $(rowContent)
        .hide()
        .appendTo('#settings-user-table')
        .fadeIn('slow')
}

function actionColumn(userId) { 
    return `<td>
                <button id="remove-user-${userId}-btn" class="btn btn-outline-secondary w-100">
                    <span class="fw-bold">-</span>
                </button>
            </td>`
}

function addRemoveUserEventListener(userId) { $(`#remove-user-${userId}-btn`).click(removeUserHandle) }
function removeUserHandle(event) { 
    const rowToRemove = $(this).closest('tr')
    rowToRemove.fadeOut('slow', () => { rowToRemove.remove() })
}