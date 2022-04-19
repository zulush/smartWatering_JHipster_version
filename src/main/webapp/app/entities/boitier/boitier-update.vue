<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.boitier.home.createOrEditLabel" data-cy="BoitierCreateUpdateHeading">Create or edit a Boitier</h2>
        <div>
          <div class="form-group" v-if="boitier.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="boitier.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="boitier-reference">Reference</label>
            <input
              type="number"
              class="form-control"
              name="reference"
              id="boitier-reference"
              data-cy="reference"
              :class="{ valid: !$v.boitier.reference.$invalid, invalid: $v.boitier.reference.$invalid }"
              v-model.number="$v.boitier.reference.$model"
              required
            />
            <div v-if="$v.boitier.reference.$anyDirty && $v.boitier.reference.$invalid">
              <small class="form-text text-danger" v-if="!$v.boitier.reference.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.boitier.reference.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="boitier-type">Type</label>
            <input
              type="text"
              class="form-control"
              name="type"
              id="boitier-type"
              data-cy="type"
              :class="{ valid: !$v.boitier.type.$invalid, invalid: $v.boitier.type.$invalid }"
              v-model="$v.boitier.type.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="boitier-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="boitier-code"
              data-cy="code"
              :class="{ valid: !$v.boitier.code.$invalid, invalid: $v.boitier.code.$invalid }"
              v-model="$v.boitier.code.$model"
            />
            <div v-if="$v.boitier.code.$anyDirty && $v.boitier.code.$invalid">
              <small class="form-text text-danger" v-if="!$v.boitier.code.minLength">
                This field is required to be at least 64 characters.
              </small>
            </div>
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
            :disabled="$v.boitier.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./boitier-update.component.ts"></script>
