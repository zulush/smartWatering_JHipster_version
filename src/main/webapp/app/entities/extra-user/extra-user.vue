<template>
  <div>
    <h2 id="page-heading" data-cy="ExtraUserHeading">
      <span id="extra-user-heading">Extra Users</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ExtraUserCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-extra-user"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Extra User </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && extraUsers && extraUsers.length === 0">
      <span>No extraUsers found</span>
    </div>
    <div class="table-responsive" v-if="extraUsers && extraUsers.length > 0">
      <table class="table table-striped" aria-describedby="extraUsers">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Phone</span></th>
            <th scope="row"><span>Address</span></th>
            <th scope="row"><span>Internal User</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="extraUser in extraUsers" :key="extraUser.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ExtraUserView', params: { extraUserId: extraUser.id } }">{{ extraUser.id }}</router-link>
            </td>
            <td>{{ extraUser.phone }}</td>
            <td>{{ extraUser.address }}</td>
            <td>
              {{ extraUser.internalUser ? extraUser.internalUser.id : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ExtraUserView', params: { extraUserId: extraUser.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ExtraUserEdit', params: { extraUserId: extraUser.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(extraUser)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="smartWateringApp.extraUser.delete.question" data-cy="extraUserDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-extraUser-heading">Are you sure you want to delete this Extra User?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-extraUser"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeExtraUser()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./extra-user.component.ts"></script>
