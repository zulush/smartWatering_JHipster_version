<template>
  <div>
    <h2 id="page-heading" data-cy="ZoneHeading">
      <span id="zone-heading">Zones</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ZoneCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-zone">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Zone </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && zones && zones.length === 0">
      <span>No zones found</span>
    </div>
    <div class="table-responsive" v-if="zones && zones.length > 0">
      <table class="table table-striped" aria-describedby="zones">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Libelle</span></th>
            <th scope="row"><span>Superficie</span></th>
            <th scope="row"><span>Photo</span></th>
            <th scope="row"><span>Type Sol</span></th>
            <th scope="row"><span>Espace Vert</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="zone in zones" :key="zone.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ZoneView', params: { zoneId: zone.id } }">{{ zone.id }}</router-link>
            </td>
            <td>{{ zone.libelle }}</td>
            <td>{{ zone.superficie }}</td>
            <td>
              <a v-if="zone.photo" v-on:click="openFile(zone.photoContentType, zone.photo)">
                <img v-bind:src="'data:' + zone.photoContentType + ';base64,' + zone.photo" style="max-height: 30px" alt="zone image" />
              </a>
              <span v-if="zone.photo">{{ zone.photoContentType }}, {{ byteSize(zone.photo) }}</span>
            </td>
            <td>
              <div v-if="zone.typeSol">
                <router-link :to="{ name: 'TypeSolView', params: { typeSolId: zone.typeSol.id } }">{{ zone.typeSol.id }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="zone.espaceVert">
                <router-link :to="{ name: 'EspaceVertView', params: { espaceVertId: zone.espaceVert.id } }">{{
                  zone.espaceVert.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ZoneView', params: { zoneId: zone.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ZoneEdit', params: { zoneId: zone.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(zone)"
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
        ><span id="smartWateringApp.zone.delete.question" data-cy="zoneDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-zone-heading">Are you sure you want to delete this Zone?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-zone"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeZone()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./zone.component.ts"></script>
