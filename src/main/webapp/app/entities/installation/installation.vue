<template>
  <div>
    <h2 id="page-heading" data-cy="InstallationHeading">
      <span id="installation-heading">Installations</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'InstallationCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-installation"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Installation </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && installations && installations.length === 0">
      <span>No installations found</span>
    </div>
    <div class="table-responsive" v-if="installations && installations.length > 0">
      <table class="table table-striped" aria-describedby="installations">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Date Dabut</span></th>
            <th scope="row"><span>Date Fin</span></th>
            <th scope="row"><span>Zone</span></th>
            <th scope="row"><span>Boitier</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="installation in installations" :key="installation.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'InstallationView', params: { installationId: installation.id } }">{{
                installation.id
              }}</router-link>
            </td>
            <td>{{ installation.dateDabut | formatDate }}</td>
            <td>{{ installation.dateFin | formatDate }}</td>
            <td>
              <div v-if="installation.zone">
                <router-link :to="{ name: 'ZoneView', params: { zoneId: installation.zone.id } }">{{ installation.zone.id }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="installation.boitier">
                <router-link :to="{ name: 'BoitierView', params: { boitierId: installation.boitier.id } }">{{
                  installation.boitier.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'InstallationView', params: { installationId: installation.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'InstallationEdit', params: { installationId: installation.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(installation)"
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
        ><span id="smartWateringApp.installation.delete.question" data-cy="installationDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-installation-heading">Are you sure you want to delete this Installation?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-installation"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeInstallation()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./installation.component.ts"></script>
