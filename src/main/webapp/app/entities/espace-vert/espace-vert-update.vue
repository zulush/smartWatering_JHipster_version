<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.espaceVert.home.createOrEditLabel" data-cy="EspaceVertCreateUpdateHeading">Create or edit a EspaceVert</h2>
        <div>
          <div class="form-group" v-if="espaceVert.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="espaceVert.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="espace-vert-lebelle">Lebelle</label>
            <input
              type="text"
              class="form-control"
              name="lebelle"
              id="espace-vert-lebelle"
              data-cy="lebelle"
              :class="{ valid: !$v.espaceVert.lebelle.$invalid, invalid: $v.espaceVert.lebelle.$invalid }"
              v-model="$v.espaceVert.lebelle.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="espace-vert-photo">Photo</label>
            <div>
              <img
                v-bind:src="'data:' + espaceVert.photoContentType + ';base64,' + espaceVert.photo"
                style="max-height: 100px"
                v-if="espaceVert.photo"
                alt="espaceVert image"
              />
              <div v-if="espaceVert.photo" class="form-text text-danger clearfix">
                <span class="pull-left">{{ espaceVert.photoContentType }}, {{ byteSize(espaceVert.photo) }}</span>
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
                v-on:change="setFileData($event, espaceVert, 'photo', true)"
                accept="image/*"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="photo"
              id="espace-vert-photo"
              data-cy="photo"
              :class="{ valid: !$v.espaceVert.photo.$invalid, invalid: $v.espaceVert.photo.$invalid }"
              v-model="$v.espaceVert.photo.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="photoContentType"
              id="espace-vert-photoContentType"
              v-model="espaceVert.photoContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="espace-vert-extraUser">Extra User</label>
            <select class="form-control" id="espace-vert-extraUser" data-cy="extraUser" name="extraUser" v-model="espaceVert.extraUser">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  espaceVert.extraUser && extraUserOption.id === espaceVert.extraUser.id ? espaceVert.extraUser : extraUserOption
                "
                v-for="extraUserOption in extraUsers"
                :key="extraUserOption.id"
              >
                {{ extraUserOption.id }}
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
            :disabled="$v.espaceVert.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./espace-vert-update.component.ts"></script>
