<template>
  <div>
    <h2 id="page-heading" data-cy="TypePlanteHeading">
      <span id="type-plante-heading">Type Plantes</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'TypePlanteCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-type-plante"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Type Plante </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && typePlantes && typePlantes.length === 0">
      <span>No typePlantes found</span>
    </div>
    <div class="table-responsive" v-if="typePlantes && typePlantes.length > 0">
      <table class="table table-striped" aria-describedby="typePlantes">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Libelle</span></th>
            <th scope="row"><span>Humidite Max</span></th>
            <th scope="row"><span>Humidite Min</span></th>
            <th scope="row"><span>Temperature</span></th>
            <th scope="row"><span>Luminosite</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="typePlante in typePlantes" :key="typePlante.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TypePlanteView', params: { typePlanteId: typePlante.id } }">{{ typePlante.id }}</router-link>
            </td>
            <td>{{ typePlante.libelle }}</td>
            <td>{{ typePlante.humiditeMax }}</td>
            <td>{{ typePlante.humiditeMin }}</td>
            <td>{{ typePlante.temperature }}</td>
            <td>{{ typePlante.luminosite }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TypePlanteView', params: { typePlanteId: typePlante.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TypePlanteEdit', params: { typePlanteId: typePlante.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(typePlante)"
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
        ><span id="smartWateringApp.typePlante.delete.question" data-cy="typePlanteDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-typePlante-heading">Are you sure you want to delete this Type Plante?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-typePlante"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeTypePlante()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./type-plante.component.ts"></script>
