<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.grandeur.home.createOrEditLabel" data-cy="GrandeurCreateUpdateHeading">Create or edit a Grandeur</h2>
        <div>
          <div class="form-group" v-if="grandeur.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="grandeur.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="grandeur-type">Type</label>
            <input
              type="text"
              class="form-control"
              name="type"
              id="grandeur-type"
              data-cy="type"
              :class="{ valid: !$v.grandeur.type.$invalid, invalid: $v.grandeur.type.$invalid }"
              v-model="$v.grandeur.type.$model"
              required
            />
            <div v-if="$v.grandeur.type.$anyDirty && $v.grandeur.type.$invalid">
              <small class="form-text text-danger" v-if="!$v.grandeur.type.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="grandeur-valeur">Valeur</label>
            <input
              type="number"
              class="form-control"
              name="valeur"
              id="grandeur-valeur"
              data-cy="valeur"
              :class="{ valid: !$v.grandeur.valeur.$invalid, invalid: $v.grandeur.valeur.$invalid }"
              v-model.number="$v.grandeur.valeur.$model"
              required
            />
            <div v-if="$v.grandeur.valeur.$anyDirty && $v.grandeur.valeur.$invalid">
              <small class="form-text text-danger" v-if="!$v.grandeur.valeur.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.grandeur.valeur.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="grandeur-unite">Unite</label>
            <input
              type="text"
              class="form-control"
              name="unite"
              id="grandeur-unite"
              data-cy="unite"
              :class="{ valid: !$v.grandeur.unite.$invalid, invalid: $v.grandeur.unite.$invalid }"
              v-model="$v.grandeur.unite.$model"
              required
            />
            <div v-if="$v.grandeur.unite.$anyDirty && $v.grandeur.unite.$invalid">
              <small class="form-text text-danger" v-if="!$v.grandeur.unite.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="grandeur-date">Date</label>
            <div class="d-flex">
              <input
                id="grandeur-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.grandeur.date.$invalid, invalid: $v.grandeur.date.$invalid }"
                required
                :value="convertDateTimeFromServer($v.grandeur.date.$model)"
                @change="updateZonedDateTimeField('date', $event)"
              />
            </div>
            <div v-if="$v.grandeur.date.$anyDirty && $v.grandeur.date.$invalid">
              <small class="form-text text-danger" v-if="!$v.grandeur.date.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.grandeur.date.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="grandeur-zone">Zone</label>
            <select class="form-control" id="grandeur-zone" data-cy="zone" name="zone" v-model="grandeur.zone">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="grandeur.zone && zoneOption.id === grandeur.zone.id ? grandeur.zone : zoneOption"
                v-for="zoneOption in zones"
                :key="zoneOption.id"
              >
                {{ zoneOption.id }}
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
            :disabled="$v.grandeur.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./grandeur-update.component.ts"></script>
