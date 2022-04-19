<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="grandeur">
        <h2 class="jh-entity-heading" data-cy="grandeurDetailsHeading"><span>Grandeur</span> {{ grandeur.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Type</span>
          </dt>
          <dd>
            <span>{{ grandeur.type }}</span>
          </dd>
          <dt>
            <span>Valeur</span>
          </dt>
          <dd>
            <span>{{ grandeur.valeur }}</span>
          </dd>
          <dt>
            <span>Unite</span>
          </dt>
          <dd>
            <span>{{ grandeur.unite }}</span>
          </dd>
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ grandeur.date | formatDate }}</span>
          </dd>
          <dt>
            <span>Zone</span>
          </dt>
          <dd>
            <div v-if="grandeur.zone">
              <router-link :to="{ name: 'ZoneView', params: { zoneId: grandeur.zone.id } }">{{ grandeur.zone.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="grandeur.id" :to="{ name: 'GrandeurEdit', params: { grandeurId: grandeur.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./grandeur-details.component.ts"></script>
