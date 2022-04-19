<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.typeSol.home.createOrEditLabel" data-cy="TypeSolCreateUpdateHeading">Create or edit a TypeSol</h2>
        <div>
          <div class="form-group" v-if="typeSol.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="typeSol.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="type-sol-lebelle">Lebelle</label>
            <input
              type="text"
              class="form-control"
              name="lebelle"
              id="type-sol-lebelle"
              data-cy="lebelle"
              :class="{ valid: !$v.typeSol.lebelle.$invalid, invalid: $v.typeSol.lebelle.$invalid }"
              v-model="$v.typeSol.lebelle.$model"
              required
            />
            <div v-if="$v.typeSol.lebelle.$anyDirty && $v.typeSol.lebelle.$invalid">
              <small class="form-text text-danger" v-if="!$v.typeSol.lebelle.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="type-sol-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="type-sol-description"
              data-cy="description"
              :class="{ valid: !$v.typeSol.description.$invalid, invalid: $v.typeSol.description.$invalid }"
              v-model="$v.typeSol.description.$model"
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
            :disabled="$v.typeSol.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./type-sol-update.component.ts"></script>
