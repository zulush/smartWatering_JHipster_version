<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.arrosage.home.createOrEditLabel" data-cy="ArrosageCreateUpdateHeading">Create or edit a Arrosage</h2>
        <div>
          <div class="form-group" v-if="arrosage.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="arrosage.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="arrosage-date">Date</label>
            <div class="d-flex">
              <input
                id="arrosage-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.arrosage.date.$invalid, invalid: $v.arrosage.date.$invalid }"
                required
                :value="convertDateTimeFromServer($v.arrosage.date.$model)"
                @change="updateZonedDateTimeField('date', $event)"
              />
            </div>
            <div v-if="$v.arrosage.date.$anyDirty && $v.arrosage.date.$invalid">
              <small class="form-text text-danger" v-if="!$v.arrosage.date.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.arrosage.date.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="arrosage-litresEau">Litres Eau</label>
            <input
              type="number"
              class="form-control"
              name="litresEau"
              id="arrosage-litresEau"
              data-cy="litresEau"
              :class="{ valid: !$v.arrosage.litresEau.$invalid, invalid: $v.arrosage.litresEau.$invalid }"
              v-model.number="$v.arrosage.litresEau.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="arrosage-zone">Zone</label>
            <select class="form-control" id="arrosage-zone" data-cy="zone" name="zone" v-model="arrosage.zone">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="arrosage.zone && zoneOption.id === arrosage.zone.id ? arrosage.zone : zoneOption"
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
            :disabled="$v.arrosage.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./arrosage-update.component.ts"></script>
