import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const ExtraUser = () => import('@/entities/extra-user/extra-user.vue');
// prettier-ignore
const ExtraUserUpdate = () => import('@/entities/extra-user/extra-user-update.vue');
// prettier-ignore
const ExtraUserDetails = () => import('@/entities/extra-user/extra-user-details.vue');
// prettier-ignore
const Notification = () => import('@/entities/notification/notification.vue');
// prettier-ignore
const NotificationUpdate = () => import('@/entities/notification/notification-update.vue');
// prettier-ignore
const NotificationDetails = () => import('@/entities/notification/notification-details.vue');
// prettier-ignore
const EspaceVert = () => import('@/entities/espace-vert/espace-vert.vue');
// prettier-ignore
const EspaceVertUpdate = () => import('@/entities/espace-vert/espace-vert-update.vue');
// prettier-ignore
const EspaceVertDetails = () => import('@/entities/espace-vert/espace-vert-details.vue');
// prettier-ignore
const Zone = () => import('@/entities/zone/zone.vue');
// prettier-ignore
const ZoneUpdate = () => import('@/entities/zone/zone-update.vue');
// prettier-ignore
const ZoneDetails = () => import('@/entities/zone/zone-details.vue');
// prettier-ignore
const Grandeur = () => import('@/entities/grandeur/grandeur.vue');
// prettier-ignore
const GrandeurUpdate = () => import('@/entities/grandeur/grandeur-update.vue');
// prettier-ignore
const GrandeurDetails = () => import('@/entities/grandeur/grandeur-details.vue');
// prettier-ignore
const TypeSol = () => import('@/entities/type-sol/type-sol.vue');
// prettier-ignore
const TypeSolUpdate = () => import('@/entities/type-sol/type-sol-update.vue');
// prettier-ignore
const TypeSolDetails = () => import('@/entities/type-sol/type-sol-details.vue');
// prettier-ignore
const Plante = () => import('@/entities/plante/plante.vue');
// prettier-ignore
const PlanteUpdate = () => import('@/entities/plante/plante-update.vue');
// prettier-ignore
const PlanteDetails = () => import('@/entities/plante/plante-details.vue');
// prettier-ignore
const Plantage = () => import('@/entities/plantage/plantage.vue');
// prettier-ignore
const PlantageUpdate = () => import('@/entities/plantage/plantage-update.vue');
// prettier-ignore
const PlantageDetails = () => import('@/entities/plantage/plantage-details.vue');
// prettier-ignore
const TypePlante = () => import('@/entities/type-plante/type-plante.vue');
// prettier-ignore
const TypePlanteUpdate = () => import('@/entities/type-plante/type-plante-update.vue');
// prettier-ignore
const TypePlanteDetails = () => import('@/entities/type-plante/type-plante-details.vue');
// prettier-ignore
const Installation = () => import('@/entities/installation/installation.vue');
// prettier-ignore
const InstallationUpdate = () => import('@/entities/installation/installation-update.vue');
// prettier-ignore
const InstallationDetails = () => import('@/entities/installation/installation-details.vue');
// prettier-ignore
const Boitier = () => import('@/entities/boitier/boitier.vue');
// prettier-ignore
const BoitierUpdate = () => import('@/entities/boitier/boitier-update.vue');
// prettier-ignore
const BoitierDetails = () => import('@/entities/boitier/boitier-details.vue');
// prettier-ignore
const Connecte = () => import('@/entities/connecte/connecte.vue');
// prettier-ignore
const ConnecteUpdate = () => import('@/entities/connecte/connecte-update.vue');
// prettier-ignore
const ConnecteDetails = () => import('@/entities/connecte/connecte-details.vue');
// prettier-ignore
const Capteur = () => import('@/entities/capteur/capteur.vue');
// prettier-ignore
const CapteurUpdate = () => import('@/entities/capteur/capteur-update.vue');
// prettier-ignore
const CapteurDetails = () => import('@/entities/capteur/capteur-details.vue');
// prettier-ignore
const Arrosage = () => import('@/entities/arrosage/arrosage.vue');
// prettier-ignore
const ArrosageUpdate = () => import('@/entities/arrosage/arrosage-update.vue');
// prettier-ignore
const ArrosageDetails = () => import('@/entities/arrosage/arrosage-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'extra-user',
      name: 'ExtraUser',
      component: ExtraUser,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'extra-user/new',
      name: 'ExtraUserCreate',
      component: ExtraUserUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'extra-user/:extraUserId/edit',
      name: 'ExtraUserEdit',
      component: ExtraUserUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'extra-user/:extraUserId/view',
      name: 'ExtraUserView',
      component: ExtraUserDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'notification',
      name: 'Notification',
      component: Notification,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'notification/new',
      name: 'NotificationCreate',
      component: NotificationUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'notification/:notificationId/edit',
      name: 'NotificationEdit',
      component: NotificationUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'notification/:notificationId/view',
      name: 'NotificationView',
      component: NotificationDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'espace-vert',
      name: 'EspaceVert',
      component: EspaceVert,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'espace-vert/new',
      name: 'EspaceVertCreate',
      component: EspaceVertUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'espace-vert/:espaceVertId/edit',
      name: 'EspaceVertEdit',
      component: EspaceVertUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'espace-vert/:espaceVertId/view',
      name: 'EspaceVertView',
      component: EspaceVertDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zone',
      name: 'Zone',
      component: Zone,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zone/new',
      name: 'ZoneCreate',
      component: ZoneUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zone/:zoneId/edit',
      name: 'ZoneEdit',
      component: ZoneUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zone/:zoneId/view',
      name: 'ZoneView',
      component: ZoneDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'grandeur',
      name: 'Grandeur',
      component: Grandeur,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'grandeur/new',
      name: 'GrandeurCreate',
      component: GrandeurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'grandeur/:grandeurId/edit',
      name: 'GrandeurEdit',
      component: GrandeurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'grandeur/:grandeurId/view',
      name: 'GrandeurView',
      component: GrandeurDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'type-sol',
      name: 'TypeSol',
      component: TypeSol,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'type-sol/new',
      name: 'TypeSolCreate',
      component: TypeSolUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'type-sol/:typeSolId/edit',
      name: 'TypeSolEdit',
      component: TypeSolUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'type-sol/:typeSolId/view',
      name: 'TypeSolView',
      component: TypeSolDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'plante',
      name: 'Plante',
      component: Plante,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'plante/new',
      name: 'PlanteCreate',
      component: PlanteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'plante/:planteId/edit',
      name: 'PlanteEdit',
      component: PlanteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'plante/:planteId/view',
      name: 'PlanteView',
      component: PlanteDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'plantage',
      name: 'Plantage',
      component: Plantage,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'plantage/new',
      name: 'PlantageCreate',
      component: PlantageUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'plantage/:plantageId/edit',
      name: 'PlantageEdit',
      component: PlantageUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'plantage/:plantageId/view',
      name: 'PlantageView',
      component: PlantageDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'type-plante',
      name: 'TypePlante',
      component: TypePlante,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'type-plante/new',
      name: 'TypePlanteCreate',
      component: TypePlanteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'type-plante/:typePlanteId/edit',
      name: 'TypePlanteEdit',
      component: TypePlanteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'type-plante/:typePlanteId/view',
      name: 'TypePlanteView',
      component: TypePlanteDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'installation',
      name: 'Installation',
      component: Installation,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'installation/new',
      name: 'InstallationCreate',
      component: InstallationUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'installation/:installationId/edit',
      name: 'InstallationEdit',
      component: InstallationUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'installation/:installationId/view',
      name: 'InstallationView',
      component: InstallationDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'boitier',
      name: 'Boitier',
      component: Boitier,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'boitier/new',
      name: 'BoitierCreate',
      component: BoitierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'boitier/:boitierId/edit',
      name: 'BoitierEdit',
      component: BoitierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'boitier/:boitierId/view',
      name: 'BoitierView',
      component: BoitierDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'connecte',
      name: 'Connecte',
      component: Connecte,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'connecte/new',
      name: 'ConnecteCreate',
      component: ConnecteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'connecte/:connecteId/edit',
      name: 'ConnecteEdit',
      component: ConnecteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'connecte/:connecteId/view',
      name: 'ConnecteView',
      component: ConnecteDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'capteur',
      name: 'Capteur',
      component: Capteur,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'capteur/new',
      name: 'CapteurCreate',
      component: CapteurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'capteur/:capteurId/edit',
      name: 'CapteurEdit',
      component: CapteurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'capteur/:capteurId/view',
      name: 'CapteurView',
      component: CapteurDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'arrosage',
      name: 'Arrosage',
      component: Arrosage,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'arrosage/new',
      name: 'ArrosageCreate',
      component: ArrosageUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'arrosage/:arrosageId/edit',
      name: 'ArrosageEdit',
      component: ArrosageUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'arrosage/:arrosageId/view',
      name: 'ArrosageView',
      component: ArrosageDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
