<template>
  <div>
    <h2 id="page-heading" data-cy="CapteurHeading">
      <span id="capteur-heading">Capteurs</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'CapteurCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-capteur"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Capteur </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && capteurs && capteurs.length === 0">
      <span>No capteurs found</span>
    </div>
    <div class="table-responsive" v-if="capteurs && capteurs.length > 0">
      <table class="table table-striped" aria-describedby="capteurs">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Ref</span></th>
            <th scope="row"><span>Type</span></th>
            <th scope="row"><span>Photo</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="capteur in capteurs" :key="capteur.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CapteurView', params: { capteurId: capteur.id } }">{{ capteur.id }}</router-link>
            </td>
            <td>{{ capteur.ref }}</td>
            <td>{{ capteur.type }}</td>
            <td>
              <a v-if="capteur.photo" v-on:click="openFile(capteur.photoContentType, capteur.photo)">
                <img
                  v-bind:src="'data:' + capteur.photoContentType + ';base64,' + capteur.photo"
                  style="max-height: 30px"
                  alt="capteur image"
                />
              </a>
              <span v-if="capteur.photo">{{ capteur.photoContentType }}, {{ byteSize(capteur.photo) }}</span>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CapteurView', params: { capteurId: capteur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CapteurEdit', params: { capteurId: capteur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(capteur)"
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
        ><span id="smartWateringApp.capteur.delete.question" data-cy="capteurDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-capteur-heading">Are you sure you want to delete this Capteur?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-capteur"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeCapteur()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./capteur.component.ts"></script>
