<template>
  <div>
    <h2 id="page-heading" data-cy="ConnecteHeading">
      <span id="connecte-heading">Connectes</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ConnecteCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-connecte"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Connecte </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && connectes && connectes.length === 0">
      <span>No connectes found</span>
    </div>
    <div class="table-responsive" v-if="connectes && connectes.length > 0">
      <table class="table table-striped" aria-describedby="connectes">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Fonctionnel</span></th>
            <th scope="row"><span>Branche</span></th>
            <th scope="row"><span>Frequence</span></th>
            <th scope="row"><span>Marge</span></th>
            <th scope="row"><span>Capteur</span></th>
            <th scope="row"><span>Boitier</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="connecte in connectes" :key="connecte.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ConnecteView', params: { connecteId: connecte.id } }">{{ connecte.id }}</router-link>
            </td>
            <td>{{ connecte.fonctionnel }}</td>
            <td>{{ connecte.branche }}</td>
            <td>{{ connecte.frequence }}</td>
            <td>{{ connecte.marge }}</td>
            <td>
              <div v-if="connecte.capteur">
                <router-link :to="{ name: 'CapteurView', params: { capteurId: connecte.capteur.id } }">{{
                  connecte.capteur.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="connecte.boitier">
                <router-link :to="{ name: 'BoitierView', params: { boitierId: connecte.boitier.id } }">{{
                  connecte.boitier.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ConnecteView', params: { connecteId: connecte.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ConnecteEdit', params: { connecteId: connecte.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(connecte)"
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
        ><span id="smartWateringApp.connecte.delete.question" data-cy="connecteDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-connecte-heading">Are you sure you want to delete this Connecte?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-connecte"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeConnecte()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./connecte.component.ts"></script>
