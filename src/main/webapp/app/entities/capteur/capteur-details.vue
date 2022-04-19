<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="capteur">
        <h2 class="jh-entity-heading" data-cy="capteurDetailsHeading"><span>Capteur</span> {{ capteur.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Ref</span>
          </dt>
          <dd>
            <span>{{ capteur.ref }}</span>
          </dd>
          <dt>
            <span>Type</span>
          </dt>
          <dd>
            <span>{{ capteur.type }}</span>
          </dd>
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="capteur.photo">
              <a v-on:click="openFile(capteur.photoContentType, capteur.photo)">
                <img
                  v-bind:src="'data:' + capteur.photoContentType + ';base64,' + capteur.photo"
                  style="max-width: 100%"
                  alt="capteur image"
                />
              </a>
              {{ capteur.photoContentType }}, {{ byteSize(capteur.photo) }}
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="capteur.id" :to="{ name: 'CapteurEdit', params: { capteurId: capteur.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./capteur-details.component.ts"></script>
