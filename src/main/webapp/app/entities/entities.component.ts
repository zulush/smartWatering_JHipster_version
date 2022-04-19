import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import ExtraUserService from './extra-user/extra-user.service';
import NotificationService from './notification/notification.service';
import EspaceVertService from './espace-vert/espace-vert.service';
import ZoneService from './zone/zone.service';
import GrandeurService from './grandeur/grandeur.service';
import TypeSolService from './type-sol/type-sol.service';
import PlanteService from './plante/plante.service';
import PlantageService from './plantage/plantage.service';
import TypePlanteService from './type-plante/type-plante.service';
import InstallationService from './installation/installation.service';
import BoitierService from './boitier/boitier.service';
import ConnecteService from './connecte/connecte.service';
import CapteurService from './capteur/capteur.service';
import ArrosageService from './arrosage/arrosage.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('extraUserService') private extraUserService = () => new ExtraUserService();
  @Provide('notificationService') private notificationService = () => new NotificationService();
  @Provide('espaceVertService') private espaceVertService = () => new EspaceVertService();
  @Provide('zoneService') private zoneService = () => new ZoneService();
  @Provide('grandeurService') private grandeurService = () => new GrandeurService();
  @Provide('typeSolService') private typeSolService = () => new TypeSolService();
  @Provide('planteService') private planteService = () => new PlanteService();
  @Provide('plantageService') private plantageService = () => new PlantageService();
  @Provide('typePlanteService') private typePlanteService = () => new TypePlanteService();
  @Provide('installationService') private installationService = () => new InstallationService();
  @Provide('boitierService') private boitierService = () => new BoitierService();
  @Provide('connecteService') private connecteService = () => new ConnecteService();
  @Provide('capteurService') private capteurService = () => new CapteurService();
  @Provide('arrosageService') private arrosageService = () => new ArrosageService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
