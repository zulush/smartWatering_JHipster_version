<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="boitier">
        <h2 class="jh-entity-heading" data-cy="boitierDetailsHeading"><span>Boitier</span> {{ boitier.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Reference</span>
          </dt>
          <dd>
            <span>{{ boitier.reference }}</span>
          </dd>
          <dt>
            <span>Type</span>
          </dt>
          <dd>
            <span>{{ boitier.type }}</span>
          </dd>
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ boitier.code }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="boitier.id" :to="{ name: 'BoitierEdit', params: { boitierId: boitier.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./boitier-details.component.ts"></script>
