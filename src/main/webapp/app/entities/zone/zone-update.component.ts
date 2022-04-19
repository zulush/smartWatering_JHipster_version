import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import AlertService from '@/shared/alert/alert.service';

import NotificationService from '@/entities/notification/notification.service';
import { INotification } from '@/shared/model/notification.model';

import GrandeurService from '@/entities/grandeur/grandeur.service';
import { IGrandeur } from '@/shared/model/grandeur.model';

import PlantageService from '@/entities/plantage/plantage.service';
import { IPlantage } from '@/shared/model/plantage.model';

import ArrosageService from '@/entities/arrosage/arrosage.service';
import { IArrosage } from '@/shared/model/arrosage.model';

import TypeSolService from '@/entities/type-sol/type-sol.service';
import { ITypeSol } from '@/shared/model/type-sol.model';

import EspaceVertService from '@/entities/espace-vert/espace-vert.service';
import { IEspaceVert } from '@/shared/model/espace-vert.model';

import { IZone, Zone } from '@/shared/model/zone.model';
import ZoneService from './zone.service';

const validations: any = {
  zone: {
    libelle: {},
    superficie: {},
    photo: {},
  },
};

@Component({
  validations,
})
export default class ZoneUpdate extends mixins(JhiDataUtils) {
  @Inject('zoneService') private zoneService: () => ZoneService;
  @Inject('alertService') private alertService: () => AlertService;

  public zone: IZone = new Zone();

  @Inject('notificationService') private notificationService: () => NotificationService;

  public notifications: INotification[] = [];

  @Inject('grandeurService') private grandeurService: () => GrandeurService;

  public grandeurs: IGrandeur[] = [];

  @Inject('plantageService') private plantageService: () => PlantageService;

  public plantages: IPlantage[] = [];

  @Inject('arrosageService') private arrosageService: () => ArrosageService;

  public arrosages: IArrosage[] = [];

  @Inject('typeSolService') private typeSolService: () => TypeSolService;

  public typeSols: ITypeSol[] = [];

  @Inject('espaceVertService') private espaceVertService: () => EspaceVertService;

  public espaceVerts: IEspaceVert[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.zoneId) {
        vm.retrieveZone(to.params.zoneId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.zone.id) {
      this.zoneService()
        .update(this.zone)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Zone is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.zoneService()
        .create(this.zone)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Zone is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveZone(zoneId): void {
    this.zoneService()
      .find(zoneId)
      .then(res => {
        this.zone = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.zone && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.zone, field)) {
        this.zone[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.zone, fieldContentType)) {
        this.zone[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.notificationService()
      .retrieve()
      .then(res => {
        this.notifications = res.data;
      });
    this.grandeurService()
      .retrieve()
      .then(res => {
        this.grandeurs = res.data;
      });
    this.plantageService()
      .retrieve()
      .then(res => {
        this.plantages = res.data;
      });
    this.arrosageService()
      .retrieve()
      .then(res => {
        this.arrosages = res.data;
      });
    this.typeSolService()
      .retrieve()
      .then(res => {
        this.typeSols = res.data;
      });
    this.espaceVertService()
      .retrieve()
      .then(res => {
        this.espaceVerts = res.data;
      });
  }
}
