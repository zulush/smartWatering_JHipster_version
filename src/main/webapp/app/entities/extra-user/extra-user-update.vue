<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.extraUser.home.createOrEditLabel" data-cy="ExtraUserCreateUpdateHeading">Create or edit a ExtraUser</h2>
        <div>
          <div class="form-group" v-if="extraUser.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="extraUser.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="extra-user-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="extra-user-phone"
              data-cy="phone"
              :class="{ valid: !$v.extraUser.phone.$invalid, invalid: $v.extraUser.phone.$invalid }"
              v-model="$v.extraUser.phone.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="extra-user-address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="extra-user-address"
              data-cy="address"
              :class="{ valid: !$v.extraUser.address.$invalid, invalid: $v.extraUser.address.$invalid }"
              v-model="$v.extraUser.address.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="extra-user-internalUser">Internal User</label>
            <select
              class="form-control"
              id="extra-user-internalUser"
              data-cy="internalUser"
              name="internalUser"
              v-model="extraUser.internalUser"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="extraUser.internalUser && userOption.id === extraUser.internalUser.id ? extraUser.internalUser : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.id }}
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
            :disabled="$v.extraUser.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./extra-user-update.component.ts"></script>
