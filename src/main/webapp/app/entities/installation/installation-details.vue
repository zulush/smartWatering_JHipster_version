<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="installation">
        <h2 class="jh-entity-heading" data-cy="installationDetailsHeading"><span>Installation</span> {{ installation.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Date Dabut</span>
          </dt>
          <dd>
            <span>{{ installation.dateDabut | formatDate }}</span>
          </dd>
          <dt>
            <span>Date Fin</span>
          </dt>
          <dd>
            <span>{{ installation.dateFin | formatDate }}</span>
          </dd>
          <dt>
            <span>Zone</span>
          </dt>
          <dd>
            <div v-if="installation.zone">
              <router-link :to="{ name: 'ZoneView', params: { zoneId: installation.zone.id } }">{{ installation.zone.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Boitier</span>
          </dt>
          <dd>
            <div v-if="installation.boitier">
              <router-link :to="{ name: 'BoitierView', params: { boitierId: installation.boitier.id } }">{{
                installation.boitier.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="installation.id"
          :to="{ name: 'InstallationEdit', params: { installationId: installation.id } }"
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

<script lang="ts" src="./installation-details.component.ts"></script>
