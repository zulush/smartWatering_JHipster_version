<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.connecte.home.createOrEditLabel" data-cy="ConnecteCreateUpdateHeading">Create or edit a Connecte</h2>
        <div>
          <div class="form-group" v-if="connecte.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="connecte.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="connecte-fonctionnel">Fonctionnel</label>
            <input
              type="checkbox"
              class="form-check"
              name="fonctionnel"
              id="connecte-fonctionnel"
              data-cy="fonctionnel"
              :class="{ valid: !$v.connecte.fonctionnel.$invalid, invalid: $v.connecte.fonctionnel.$invalid }"
              v-model="$v.connecte.fonctionnel.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="connecte-branche">Branche</label>
            <input
              type="text"
              class="form-control"
              name="branche"
              id="connecte-branche"
              data-cy="branche"
              :class="{ valid: !$v.connecte.branche.$invalid, invalid: $v.connecte.branche.$invalid }"
              v-model="$v.connecte.branche.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="connecte-frequence">Frequence</label>
            <input
              type="number"
              class="form-control"
              name="frequence"
              id="connecte-frequence"
              data-cy="frequence"
              :class="{ valid: !$v.connecte.frequence.$invalid, invalid: $v.connecte.frequence.$invalid }"
              v-model.number="$v.connecte.frequence.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="connecte-marge">Marge</label>
            <input
              type="number"
              class="form-control"
              name="marge"
              id="connecte-marge"
              data-cy="marge"
              :class="{ valid: !$v.connecte.marge.$invalid, invalid: $v.connecte.marge.$invalid }"
              v-model.number="$v.connecte.marge.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="connecte-capteur">Capteur</label>
            <select class="form-control" id="connecte-capteur" data-cy="capteur" name="capteur" v-model="connecte.capteur">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="connecte.capteur && capteurOption.id === connecte.capteur.id ? connecte.capteur : capteurOption"
                v-for="capteurOption in capteurs"
                :key="capteurOption.id"
              >
                {{ capteurOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="connecte-boitier">Boitier</label>
            <select class="form-control" id="connecte-boitier" data-cy="boitier" name="boitier" v-model="connecte.boitier">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="connecte.boitier && boitierOption.id === connecte.boitier.id ? connecte.boitier : boitierOption"
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
            :disabled="$v.connecte.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./connecte-update.component.ts"></script>
