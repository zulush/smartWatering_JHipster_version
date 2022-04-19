<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.plante.home.createOrEditLabel" data-cy="PlanteCreateUpdateHeading">Create or edit a Plante</h2>
        <div>
          <div class="form-group" v-if="plante.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="plante.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="plante-libelle">Libelle</label>
            <input
              type="text"
              class="form-control"
              name="libelle"
              id="plante-libelle"
              data-cy="libelle"
              :class="{ valid: !$v.plante.libelle.$invalid, invalid: $v.plante.libelle.$invalid }"
              v-model="$v.plante.libelle.$model"
              required
            />
            <div v-if="$v.plante.libelle.$anyDirty && $v.plante.libelle.$invalid">
              <small class="form-text text-danger" v-if="!$v.plante.libelle.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="plante-photo">Photo</label>
            <div>
              <img
                v-bind:src="'data:' + plante.photoContentType + ';base64,' + plante.photo"
                style="max-height: 100px"
                v-if="plante.photo"
                alt="plante image"
              />
              <div v-if="plante.photo" class="form-text text-danger clearfix">
                <span class="pull-left">{{ plante.photoContentType }}, {{ byteSize(plante.photo) }}</span>
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
                v-on:change="setFileData($event, plante, 'photo', true)"
                accept="image/*"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="photo"
              id="plante-photo"
              data-cy="photo"
              :class="{ valid: !$v.plante.photo.$invalid, invalid: $v.plante.photo.$invalid }"
              v-model="$v.plante.photo.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="photoContentType"
              id="plante-photoContentType"
              v-model="plante.photoContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="plante-racine">Racine</label>
            <input
              type="text"
              class="form-control"
              name="racine"
              id="plante-racine"
              data-cy="racine"
              :class="{ valid: !$v.plante.racine.$invalid, invalid: $v.plante.racine.$invalid }"
              v-model="$v.plante.racine.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="plante-type">Type</label>
            <select class="form-control" id="plante-type" data-cy="type" name="type" v-model="plante.type">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="plante.type && typePlanteOption.id === plante.type.id ? plante.type : typePlanteOption"
                v-for="typePlanteOption in typePlantes"
                :key="typePlanteOption.id"
              >
                {{ typePlanteOption.id }}
              </option>
            </select>
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
            :disabled="$v.plante.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./plante-update.component.ts"></script>
