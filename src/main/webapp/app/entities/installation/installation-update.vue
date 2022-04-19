<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.installation.home.createOrEditLabel" data-cy="InstallationCreateUpdateHeading">
          Create or edit a Installation
        </h2>
        <div>
          <div class="form-group" v-if="installation.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="installation.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="installation-dateDabut">Date Dabut</label>
            <div class="d-flex">
              <input
                id="installation-dateDabut"
                data-cy="dateDabut"
                type="datetime-local"
                class="form-control"
                name="dateDabut"
                :class="{ valid: !$v.installation.dateDabut.$invalid, invalid: $v.installation.dateDabut.$invalid }"
                required
                :value="convertDateTimeFromServer($v.installation.dateDabut.$model)"
                @change="updateZonedDateTimeField('dateDabut', $event)"
              />
            </div>
            <div v-if="$v.installation.dateDabut.$anyDirty && $v.installation.dateDabut.$invalid">
              <small class="form-text text-danger" v-if="!$v.installation.dateDabut.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.installation.dateDabut.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="installation-dateFin">Date Fin</label>
            <div class="d-flex">
              <input
                id="installation-dateFin"
                data-cy="dateFin"
                type="datetime-local"
                class="form-control"
                name="dateFin"
                :class="{ valid: !$v.installation.dateFin.$invalid, invalid: $v.installation.dateFin.$invalid }"
                :value="convertDateTimeFromServer($v.installation.dateFin.$model)"
                @change="updateZonedDateTimeField('dateFin', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="installation-zone">Zone</label>
            <select class="form-control" id="installation-zone" data-cy="zone" name="zone" v-model="installation.zone">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="installation.zone && zoneOption.id === installation.zone.id ? installation.zone : zoneOption"
                v-for="zoneOption in zones"
                :key="zoneOption.id"
              >
                {{ zoneOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="installation-boitier">Boitier</label>
            <select class="form-control" id="installation-boitier" data-cy="boitier" name="boitier" v-model="installation.boitier">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="installation.boitier && boitierOption.id === installation.boitier.id ? installation.boitier : boitierOption"
                v-for="boitierOption in boitiers"
                :key="boitierOption.id"
              >
                {{ boitierOption.id }}
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
            :disabled="$v.installation.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./installation-update.component.ts"></script>
