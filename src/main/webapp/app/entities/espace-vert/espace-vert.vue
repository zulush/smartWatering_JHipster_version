<template>
  <div>
    <h2 id="page-heading" data-cy="EspaceVertHeading">
      <span id="espace-vert-heading">Espace Verts</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'EspaceVertCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-espace-vert"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Espace Vert </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && espaceVerts && espaceVerts.length === 0">
      <span>No espaceVerts found</span>
    </div>
    <div class="table-responsive" v-if="espaceVerts && espaceVerts.length > 0">
      <table class="table table-striped" aria-describedby="espaceVerts">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Lebelle</span></th>
            <th scope="row"><span>Photo</span></th>
            <th scope="row"><span>Extra User</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="espaceVert in espaceVerts" :key="espaceVert.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'EspaceVertView', params: { espaceVertId: espaceVert.id } }">{{ espaceVert.id }}</router-link>
            </td>
            <td>{{ espaceVert.lebelle }}</td>
            <td>
              <a v-if="espaceVert.photo" v-on:click="openFile(espaceVert.photoContentType, espaceVert.photo)">
                <img
                  v-bind:src="'data:' + espaceVert.photoContentType + ';base64,' + espaceVert.photo"
                  style="max-height: 30px"
                  alt="espaceVert image"
                />
              </a>
              <span v-if="espaceVert.photo">{{ espaceVert.photoContentType }}, {{ byteSize(espaceVert.photo) }}</span>
            </td>
            <td>
              <div v-if="espaceVert.extraUser">
                <router-link :to="{ name: 'ExtraUserView', params: { extraUserId: espaceVert.extraUser.id } }">{{
                  espaceVert.extraUser.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'EspaceVertView', params: { espaceVertId: espaceVert.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'EspaceVertEdit', params: { espaceVertId: espaceVert.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(espaceVert)"
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
        ><span id="smartWateringApp.espaceVert.delete.question" data-cy="espaceVertDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-espaceVert-heading">Are you sure you want to delete this Espace Vert?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-espaceVert"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeEspaceVert()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./espace-vert.component.ts"></script>
