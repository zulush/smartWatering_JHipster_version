<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.capteur.home.createOrEditLabel" data-cy="CapteurCreateUpdateHeading">Create or edit a Capteur</h2>
        <div>
          <div class="form-group" v-if="capteur.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="capteur.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="capteur-ref">Ref</label>
            <input
              type="text"
              class="form-control"
              name="ref"
              id="capteur-ref"
              data-cy="ref"
              :class="{ valid: !$v.capteur.ref.$invalid, invalid: $v.capteur.ref.$invalid }"
              v-model="$v.capteur.ref.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="capteur-type">Type</label>
            <input
              type="text"
              class="form-control"
              name="type"
              id="capteur-type"
              data-cy="type"
              :class="{ valid: !$v.capteur.type.$invalid, invalid: $v.capteur.type.$invalid }"
              v-model="$v.capteur.type.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="capteur-photo">Photo</label>
            <div>
              <img
                v-bind:src="'data:' + capteur.photoContentType + ';base64,' + capteur.photo"
                style="max-height: 100px"
                v-if="capteur.photo"
                alt="capteur image"
              />
              <div v-if="capteur.photo" class="form-text text-danger clearfix">
                <span class="pull-left">{{ capteur.photoContentType }}, {{ byteSize(capteur.photo) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('photo', 'photoContentType', 'file_photo')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_photo"
                id="file_photo"
                data-cy="photo"
                v-on:change="setFileData($event, capteur, 'photo', true)"
                accept="image/*"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="photo"
              id="capteur-photo"
              data-cy="photo"
              :class="{ valid: !$v.capteur.photo.$invalid, invalid: $v.capteur.photo.$invalid }"
              v-model="$v.capteur.photo.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="photoContentType"
              id="capteur-photoContentType"
              v-model="capteur.photoContentType"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.capteur.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./capteur-update.component.ts"></script>
