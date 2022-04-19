<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="extraUser">
        <h2 class="jh-entity-heading" data-cy="extraUserDetailsHeading"><span>ExtraUser</span> {{ extraUser.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Phone</span>
          </dt>
          <dd>
            <span>{{ extraUser.phone }}</span>
          </dd>
          <dt>
            <span>Address</span>
          </dt>
          <dd>
            <span>{{ extraUser.address }}</span>
          </dd>
          <dt>
            <span>Internal User</span>
          </dt>
          <dd>
            {{ extraUser.internalUser ? extraUser.internalUser.id : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="extraUser.id"
          :to="{ name: 'ExtraUserEdit', params: { extraUserId: extraUser.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./extra-user-details.component.ts"></script>
