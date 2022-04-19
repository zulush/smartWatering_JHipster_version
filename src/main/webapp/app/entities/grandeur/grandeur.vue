<template>
  <div>
    <h2 id="page-heading" data-cy="GrandeurHeading">
      <span id="grandeur-heading">Grandeurs</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'GrandeurCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-grandeur"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Grandeur </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && grandeurs && grandeurs.length === 0">
      <span>No grandeurs found</span>
    </div>
    <div class="table-responsive" v-if="grandeurs && grandeurs.length > 0">
      <table class="table table-striped" aria-describedby="grandeurs">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Type</span></th>
            <th scope="row"><span>Valeur</span></th>
            <th scope="row"><span>Unite</span></th>
            <th scope="row"><span>Date</span></th>
            <th scope="row"><span>Zone</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grandeur in grandeurs" :key="grandeur.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'GrandeurView', params: { grandeurId: grandeur.id } }">{{ grandeur.id }}</router-link>
            </td>
            <td>{{ grandeur.type }}</td>
            <td>{{ grandeur.valeur }}</td>
            <td>{{ grandeur.unite }}</td>
            <td>{{ grandeur.date | formatDate }}</td>
            <td>
              <div v-if="grandeur.zone">
                <router-link :to="{ name: 'ZoneView', params: { zoneId: grandeur.zone.id } }">{{ grandeur.zone.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'GrandeurView', params: { grandeurId: grandeur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'GrandeurEdit', params: { grandeurId: grandeur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(grandeur)"
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
        ><span id="smartWateringApp.grandeur.delete.question" data-cy="grandeurDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-grandeur-heading">Are you sure you want to delete this Grandeur?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-grandeur"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeGrandeur()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./grandeur.component.ts"></script>
