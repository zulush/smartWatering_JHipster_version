<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="zone">
        <h2 class="jh-entity-heading" data-cy="zoneDetailsHeading"><span>Zone</span> {{ zone.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Libelle</span>
          </dt>
          <dd>
            <span>{{ zone.libelle }}</span>
          </dd>
          <dt>
            <span>Superficie</span>
          </dt>
          <dd>
            <span>{{ zone.superficie }}</span>
          </dd>
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="zone.photo">
              <a v-on:click="openFile(zone.photoContentType, zone.photo)">
                <img v-bind:src="'data:' + zone.photoContentType + ';base64,' + zone.photo" style="max-width: 100%" alt="zone image" />
              </a>
              {{ zone.photoContentType }}, {{ byteSize(zone.photo) }}
            </div>
          </dd>
          <dt>
            <span>Type Sol</span>
          </dt>
          <dd>
            <div v-if="zone.typeSol">
              <router-link :to="{ name: 'TypeSolView', params: { typeSolId: zone.typeSol.id } }">{{ zone.typeSol.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Espace Vert</span>
          </dt>
          <dd>
            <div v-if="zone.espaceVert">
              <router-link :to="{ name: 'EspaceVertView', params: { espaceVertId: zone.espaceVert.id } }">{{
                zone.espaceVert.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="zone.id" :to="{ name: 'ZoneEdit', params: { zoneId: zone.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./zone-details.component.ts"></script>
