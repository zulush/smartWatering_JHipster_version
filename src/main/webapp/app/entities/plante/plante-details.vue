<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="plante">
        <h2 class="jh-entity-heading" data-cy="planteDetailsHeading"><span>Plante</span> {{ plante.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Libelle</span>
          </dt>
          <dd>
            <span>{{ plante.libelle }}</span>
          </dd>
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="plante.photo">
              <a v-on:click="openFile(plante.photoContentType, plante.photo)">
                <img
                  v-bind:src="'data:' + plante.photoContentType + ';base64,' + plante.photo"
                  style="max-width: 100%"
                  alt="plante image"
                />
              </a>
              {{ plante.photoContentType }}, {{ byteSize(plante.photo) }}
            </div>
          </dd>
          <dt>
            <span>Racine</span>
          </dt>
          <dd>
            <span>{{ plante.racine }}</span>
          </dd>
          <dt>
            <span>Type</span>
          </dt>
          <dd>
            <div v-if="plante.type">
              <router-link :to="{ name: 'TypePlanteView', params: { typePlanteId: plante.type.id } }">{{ plante.type.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="plante.id" :to="{ name: 'PlanteEdit', params: { planteId: plante.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./plante-details.component.ts"></script>
