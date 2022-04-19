<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="espaceVert">
        <h2 class="jh-entity-heading" data-cy="espaceVertDetailsHeading"><span>EspaceVert</span> {{ espaceVert.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Lebelle</span>
          </dt>
          <dd>
            <span>{{ espaceVert.lebelle }}</span>
          </dd>
          <dt>
            <span>Photo</span>
          </dt>
          <dd>
            <div v-if="espaceVert.photo">
              <a v-on:click="openFile(espaceVert.photoContentType, espaceVert.photo)">
                <img
                  v-bind:src="'data:' + espaceVert.photoContentType + ';base64,' + espaceVert.photo"
                  style="max-width: 100%"
                  alt="espaceVert image"
                />
              </a>
              {{ espaceVert.photoContentType }}, {{ byteSize(espaceVert.photo) }}
            </div>
          </dd>
          <dt>
            <span>Extra User</span>
          </dt>
          <dd>
            <div v-if="espaceVert.extraUser">
              <router-link :to="{ name: 'ExtraUserView', params: { extraUserId: espaceVert.extraUser.id } }">{{
                espaceVert.extraUser.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="espaceVert.id"
          :to="{ name: 'EspaceVertEdit', params: { espaceVertId: espaceVert.id } }"
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

<script lang="ts" src="./espace-vert-details.component.ts"></script>
