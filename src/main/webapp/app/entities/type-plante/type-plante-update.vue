<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.typePlante.home.createOrEditLabel" data-cy="TypePlanteCreateUpdateHeading">Create or edit a TypePlante</h2>
        <div>
          <div class="form-group" v-if="typePlante.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="typePlante.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="type-plante-libelle">Libelle</label>
            <input
              type="text"
              class="form-control"
              name="libelle"
              id="type-plante-libelle"
              data-cy="libelle"
              :class="{ valid: !$v.typePlante.libelle.$invalid, invalid: $v.typePlante.libelle.$invalid }"
              v-model="$v.typePlante.libelle.$model"
              required
            />
            <div v-if="$v.typePlante.libelle.$anyDirty && $v.typePlante.libelle.$invalid">
              <small class="form-text text-danger" v-if="!$v.typePlante.libelle.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="type-plante-humiditeMax">Humidite Max</label>
            <input
              type="number"
              class="form-control"
              name="humiditeMax"
              id="type-plante-humiditeMax"
              data-cy="humiditeMax"
              :class="{ valid: !$v.typePlante.humiditeMax.$invalid, invalid: $v.typePlante.humiditeMax.$invalid }"
              v-model.number="$v.typePlante.humiditeMax.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="type-plante-humiditeMin">Humidite Min</label>
            <input
              type="number"
              class="form-control"
              name="humiditeMin"
              id="type-plante-humiditeMin"
              data-cy="humiditeMin"
              :class="{ valid: !$v.typePlante.humiditeMin.$invalid, invalid: $v.typePlante.humiditeMin.$invalid }"
              v-model.number="$v.typePlante.humiditeMin.$model"
              required
            />
            <div v-if="$v.typePlante.humiditeMin.$anyDirty && $v.typePlante.humiditeMin.$invalid">
              <small class="form-text text-danger" v-if="!$v.typePlante.humiditeMin.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.typePlante.humiditeMin.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="type-plante-temperature">Temperature</label>
            <input
              type="number"
              class="form-control"
              name="temperature"
              id="type-plante-temperature"
              data-cy="temperature"
              :class="{ valid: !$v.typePlante.temperature.$invalid, invalid: $v.typePlante.temperature.$invalid }"
              v-model.number="$v.typePlante.temperature.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="type-plante-luminosite">Luminosite</label>
            <input
              type="number"
              class="form-control"
              name="luminosite"
              id="type-plante-luminosite"
              data-cy="luminosite"
              :class="{ valid: !$v.typePlante.luminosite.$invalid, invalid: $v.typePlante.luminosite.$invalid }"
              v-model.number="$v.typePlante.luminosite.$model"
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
            :disabled="$v.typePlante.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./type-plante-update.component.ts"></script>
