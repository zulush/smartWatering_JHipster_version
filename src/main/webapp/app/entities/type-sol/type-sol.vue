<template>
  <div>
    <h2 id="page-heading" data-cy="TypeSolHeading">
      <span id="type-sol-heading">Type Sols</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'TypeSolCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-type-sol"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Type Sol </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && typeSols && typeSols.length === 0">
      <span>No typeSols found</span>
    </div>
    <div class="table-responsive" v-if="typeSols && typeSols.length > 0">
      <table class="table table-striped" aria-describedby="typeSols">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Lebelle</span></th>
            <th scope="row"><span>Description</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="typeSol in typeSols" :key="typeSol.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TypeSolView', params: { typeSolId: typeSol.id } }">{{ typeSol.id }}</router-link>
            </td>
            <td>{{ typeSol.lebelle }}</td>
            <td>{{ typeSol.description }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TypeSolView', params: { typeSolId: typeSol.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TypeSolEdit', params: { typeSolId: typeSol.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(typeSol)"
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
        ><span id="smartWateringApp.typeSol.delete.question" data-cy="typeSolDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-typeSol-heading">Are you sure you want to delete this Type Sol?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-typeSol"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeTypeSol()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./type-sol.component.ts"></script>
