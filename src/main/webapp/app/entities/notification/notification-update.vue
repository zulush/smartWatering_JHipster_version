<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="smartWateringApp.notification.home.createOrEditLabel" data-cy="NotificationCreateUpdateHeading">
          Create or edit a Notification
        </h2>
        <div>
          <div class="form-group" v-if="notification.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="notification.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-date">Date</label>
            <div class="d-flex">
              <input
                id="notification-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.notification.date.$invalid, invalid: $v.notification.date.$invalid }"
                required
                :value="convertDateTimeFromServer($v.notification.date.$model)"
                @change="updateZonedDateTimeField('date', $event)"
              />
            </div>
            <div v-if="$v.notification.date.$anyDirty && $v.notification.date.$invalid">
              <small class="form-text text-danger" v-if="!$v.notification.date.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.notification.date.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-content">Content</label>
            <input
              type="text"
              class="form-control"
              name="content"
              id="notification-content"
              data-cy="content"
              :class="{ valid: !$v.notification.content.$invalid, invalid: $v.notification.content.$invalid }"
              v-model="$v.notification.content.$model"
              required
            />
            <div v-if="$v.notification.content.$anyDirty && $v.notification.content.$invalid">
              <small class="form-text text-danger" v-if="!$v.notification.content.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-vu">Vu</label>
            <input
              type="checkbox"
              class="form-check"
              name="vu"
              id="notification-vu"
              data-cy="vu"
              :class="{ valid: !$v.notification.vu.$invalid, invalid: $v.notification.vu.$invalid }"
              v-model="$v.notification.vu.$model"
              required
            />
            <div v-if="$v.notification.vu.$anyDirty && $v.notification.vu.$invalid">
              <small class="form-text text-danger" v-if="!$v.notification.vu.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-zone">Zone</label>
            <select class="form-control" id="notification-zone" data-cy="zone" name="zone" v-model="notification.zone">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="notification.zone && zoneOption.id === notification.zone.id ? notification.zone : zoneOption"
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
            :disabled="$v.notification.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./notification-update.component.ts"></script>
