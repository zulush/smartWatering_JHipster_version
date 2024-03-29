<template>
  <div>
    <h2 id="page-heading" data-cy="PlantageHeading">
      <span id="plantage-heading">Plantages</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'PlantageCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-plantage"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Plantage </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && plantages && plantages.length === 0">
      <span>No plantages found</span>
    </div>
    <div class="table-responsive" v-if="plantages && plantages.length > 0">
      <table class="table table-striped" aria-describedby="plantages">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Date</span></th>
            <th scope="row"><span>Nombre</span></th>
            <th scope="row"><span>Plante</span></th>
            <th scope="row"><span>Zone</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plantage in plantages" :key="plantage.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'PlantageView', params: { plantageId: plantage.id } }">{{ plantage.id }}</router-link>
            </td>
            <td>{{ plantage.date | formatDate }}</td>
            <td>{{ plantage.nombre }}</td>
            <td>
              <div v-if="plantage.plante">
                <router-link :to="{ name: 'PlanteView', params: { planteId: plantage.plante.id } }">{{ plantage.plante.id }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="plantage.zone">
                <router-link :to="{ name: 'ZoneView', params: { zoneId: plantage.zone.id } }">{{ plantage.zone.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'PlantageView', params: { plantageId: plantage.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'PlantageEdit', params: { plantageId: plantage.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(plantage)"
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
        ><span id="smartWateringApp.plantage.delete.question" data-cy="plantageDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-plantage-heading">Are you sure you want to delete this Plantage?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-plantage"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removePlantage()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./plantage.component.ts"></script>
