<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.zone.home.createOrEditLabel" data-cy="ZoneCreateUpdateHeading">Create or edit a Zone</h2>
        <div>
          <div class="form-group" v-if="zone.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="zone.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="zone-libelle">Libelle</label>
            <input
              type="text"
              class="form-control"
              name="libelle"
              id="zone-libelle"
              data-cy="libelle"
              :class="{ valid: !$v.zone.libelle.$invalid, invalid: $v.zone.libelle.$invalid }"
              v-model="$v.zone.libelle.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="zone-superficie">Superficie</label>
            <input
              type="number"
              class="form-control"
              name="superficie"
              id="zone-superficie"
              data-cy="superficie"
              :class="{ valid: !$v.zone.superficie.$invalid, invalid: $v.zone.superficie.$invalid }"
              v-model.number="$v.zone.superficie.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="zone-photo">Photo</label>
            <div>
              <img
                v-bind:src="'data:' + zone.photoContentType + ';base64,' + zone.photo"
                style="max-height: 100px"
                v-if="zone.photo"
                alt="zone image"
              />
              <div v-if="zone.photo" class="form-text text-danger clearfix">
                <span class="pull-left">{{ zone.photoContentType }}, {{ byteSize(zone.photo) }}</span>
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
                v-on:change="setFileData($event, zone, 'photo', true)"
                accept="image/*"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="photo"
              id="zone-photo"
              data-cy="photo"
              :class="{ valid: !$v.zone.photo.$invalid, invalid: $v.zone.photo.$invalid }"
              v-model="$v.zone.photo.$model"
            />
            <input type="hidden" class="form-control" name="photoContentType" id="zone-photoContentType" v-model="zone.photoContentType" />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="zone-typeSol">Type Sol</label>
            <select class="form-control" id="zone-typeSol" data-cy="typeSol" name="typeSol" v-model="zone.typeSol">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="zone.typeSol && typeSolOption.id === zone.typeSol.id ? zone.typeSol : typeSolOption"
                v-for="typeSolOption in typeSols"
                :key="typeSolOption.id"
              >
                {{ typeSolOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="zone-espaceVert">Espace Vert</label>
            <select class="form-control" id="zone-espaceVert" data-cy="espaceVert" name="espaceVert" v-model="zone.espaceVert">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="zone.espaceVert && espaceVertOption.id === zone.espaceVert.id ? zone.espaceVert : espaceVertOption"
                v-for="espaceVertOption in espaceVerts"
                :key="espaceVertOption.id"
              >
                {{ espaceVertOption.id }}
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
            :disabled="$v.zone.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./zone-update.component.ts"></script>
