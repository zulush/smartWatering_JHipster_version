<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.plantage.home.createOrEditLabel" data-cy="PlantageCreateUpdateHeading">Create or edit a Plantage</h2>
        <div>
          <div class="form-group" v-if="plantage.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="plantage.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="plantage-date">Date</label>
            <div class="d-flex">
              <input
                id="plantage-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.plantage.date.$invalid, invalid: $v.plantage.date.$invalid }"
                required
                :value="convertDateTimeFromServer($v.plantage.date.$model)"
                @change="updateZonedDateTimeField('date', $event)"
              />
            </div>
            <div v-if="$v.plantage.date.$anyDirty && $v.plantage.date.$invalid">
              <small class="form-text text-danger" v-if="!$v.plantage.date.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.plantage.date.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="plantage-nombre">Nombre</label>
            <input
              type="number"
              class="form-control"
              name="nombre"
              id="plantage-nombre"
              data-cy="nombre"
              :class="{ valid: !$v.plantage.nombre.$invalid, invalid: $v.plantage.nombre.$invalid }"
              v-model.number="$v.plantage.nombre.$model"
              required
            />
            <div v-if="$v.plantage.nombre.$anyDirty && $v.plantage.nombre.$invalid">
              <small class="form-text text-danger" v-if="!$v.plantage.nombre.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.plantage.nombre.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="plantage-plante">Plante</label>
            <select class="form-control" id="plantage-plante" data-cy="plante" name="plante" v-model="plantage.plante">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="plantage.plante && planteOption.id === plantage.plante.id ? plantage.plante : planteOption"
                v-for="planteOption in plantes"
                :key="planteOption.id"
              >
                {{ planteOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="plantage-zone">Zone</label>
            <select class="form-control" id="plantage-zone" data-cy="zone" name="zone" v-model="plantage.zone">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="plantage.zone && zoneOption.id === plantage.zone.id ? plantage.zone : zoneOption"
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
            :disabled="$v.plantage.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./plantage-update.component.ts"></script>
