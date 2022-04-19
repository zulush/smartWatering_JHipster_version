<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="plantage">
        <h2 class="jh-entity-heading" data-cy="plantageDetailsHeading"><span>Plantage</span> {{ plantage.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ plantage.date | formatDate }}</span>
          </dd>
          <dt>
            <span>Nombre</span>
          </dt>
          <dd>
            <span>{{ plantage.nombre }}</span>
          </dd>
          <dt>
            <span>Plante</span>
          </dt>
          <dd>
            <div v-if="plantage.plante">
              <router-link :to="{ name: 'PlanteView', params: { planteId: plantage.plante.id } }">{{ plantage.plante.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Zone</span>
          </dt>
          <dd>
            <div v-if="plantage.zone">
              <router-link :to="{ name: 'ZoneView', params: { zoneId: plantage.zone.id } }">{{ plantage.zone.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="plantage.id" :to="{ name: 'PlantageEdit', params: { plantageId: plantage.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./plantage-details.component.ts"></script>
