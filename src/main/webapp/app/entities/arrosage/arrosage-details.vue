<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="arrosage">
        <h2 class="jh-entity-heading" data-cy="arrosageDetailsHeading"><span>Arrosage</span> {{ arrosage.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ arrosage.date | formatDate }}</span>
          </dd>
          <dt>
            <span>Litres Eau</span>
          </dt>
          <dd>
            <span>{{ arrosage.litresEau }}</span>
          </dd>
          <dt>
            <span>Zone</span>
          </dt>
          <dd>
            <div v-if="arrosage.zone">
              <router-link :to="{ name: 'ZoneView', params: { zoneId: arrosage.zone.id } }">{{ arrosage.zone.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="arrosage.id" :to="{ name: 'ArrosageEdit', params: { arrosageId: arrosage.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./arrosage-details.component.ts"></script>
