import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import AlertService from '@/shared/alert/alert.service';

import ZoneService from '@/entities/zone/zone.service';
import { IZone } from '@/shared/model/zone.model';

import ExtraUserService from '@/entities/extra-user/extra-user.service';
import { IExtraUser } from '@/shared/model/extra-user.model';

import { IEspaceVert, EspaceVert } from '@/shared/model/espace-vert.model';
import EspaceVertService from './espace-vert.service';

const validations: any = {
  espaceVert: {
    lebelle: {},
    photo: {},
  },
};

@Component({
  validations,
})
export default class EspaceVertUpdate extends mixins(JhiDataUtils) {
  @Inject('espaceVertService') private espaceVertService: () => EspaceVertService;
  @Inject('alertService') private alertService: () => AlertService;

  public espaceVert: IEspaceVert = new EspaceVert();

  @Inject('zoneService') private zoneService: () => ZoneService;

  public zones: IZone[] = [];

  @Inject('extraUserService') private extraUserService: () => ExtraUserService;

  public extraUsers: IExtraUser[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.espaceVertId) {
        vm.retrieveEspaceVert(to.params.espaceVertId);
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
    if (this.espaceVert.id) {
      this.espaceVertService()
        .update(this.espaceVert)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A EspaceVert is updated with identifier ' + param.id;
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
      this.espaceVertService()
        .create(this.espaceVert)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A EspaceVert is created with identifier ' + param.id;
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

  public retrieveEspaceVert(espaceVertId): void {
    this.espaceVertService()
      .find(espaceVertId)
      .then(res => {
        this.espaceVert = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.espaceVert && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.espaceVert, field)) {
        this.espaceVert[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.espaceVert, fieldContentType)) {
        this.espaceVert[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.zoneService()
      .retrieve()
      .then(res => {
        this.zones = res.data;
      });
    this.extraUserService()
      .retrieve()
      .then(res => {
        this.extraUsers = res.data;
      });
  }
}
