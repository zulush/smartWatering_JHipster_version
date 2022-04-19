<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="connecte">
        <h2 class="jh-entity-heading" data-cy="connecteDetailsHeading"><span>Connecte</span> {{ connecte.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Fonctionnel</span>
          </dt>
          <dd>
            <span>{{ connecte.fonctionnel }}</span>
          </dd>
          <dt>
            <span>Branche</span>
          </dt>
          <dd>
            <span>{{ connecte.branche }}</span>
          </dd>
          <dt>
            <span>Frequence</span>
          </dt>
          <dd>
            <span>{{ connecte.frequence }}</span>
          </dd>
          <dt>
            <span>Marge</span>
          </dt>
          <dd>
            <span>{{ connecte.marge }}</span>
          </dd>
          <dt>
            <span>Capteur</span>
          </dt>
          <dd>
            <div v-if="connecte.capteur">
              <router-link :to="{ name: 'CapteurView', params: { capteurId: connecte.capteur.id } }">{{ connecte.capteur.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Boitier</span>
          </dt>
          <dd>
            <div v-if="connecte.boitier">
              <router-link :to="{ name: 'BoitierView', params: { boitierId: connecte.boitier.id } }">{{ connecte.boitier.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="connecte.id" :to="{ name: 'ConnecteEdit', params: { connecteId: connecte.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./connecte-details.component.ts"></script>
