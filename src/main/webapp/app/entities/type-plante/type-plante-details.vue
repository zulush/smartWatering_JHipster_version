<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="typePlante">
        <h2 class="jh-entity-heading" data-cy="typePlanteDetailsHeading"><span>TypePlante</span> {{ typePlante.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Libelle</span>
          </dt>
          <dd>
            <span>{{ typePlante.libelle }}</span>
          </dd>
          <dt>
            <span>Humidite Max</span>
          </dt>
          <dd>
            <span>{{ typePlante.humiditeMax }}</span>
          </dd>
          <dt>
            <span>Humidite Min</span>
          </dt>
          <dd>
            <span>{{ typePlante.humiditeMin }}</span>
          </dd>
          <dt>
            <span>Temperature</span>
          </dt>
          <dd>
            <span>{{ typePlante.temperature }}</span>
          </dd>
          <dt>
            <span>Luminosite</span>
          </dt>
          <dd>
            <span>{{ typePlante.luminosite }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="typePlante.id"
          :to="{ name: 'TypePlanteEdit', params: { typePlanteId: typePlante.id } }"
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

<script lang="ts" src="./type-plante-details.component.ts"></script>
