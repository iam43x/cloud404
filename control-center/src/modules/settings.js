import { renderAllUser, renderAddUserModal } from "./user-action.js"

export function renderSettingsTab() {
    $('#settings-tab').append(
        `<table class="table table-sm table-dark align-middle table-hover text-center">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Server</th>
                    <th scope="col">Comment</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id="settings-user-table"></tbody>
            <tfoot>
                <tr class="text-center">
                    <td colspan="5">
                        <button id="add-user-modal-btn" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#addUserModal">
                            <span class="fw-bold">+</span>
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>`
    )
    renderAllUser()
    renderAddUserModal()
}