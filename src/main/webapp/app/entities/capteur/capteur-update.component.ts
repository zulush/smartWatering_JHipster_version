import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import AlertService from '@/shared/alert/alert.service';

import { ICapteur, Capteur } from '@/shared/model/capteur.model';
import CapteurService from './capteur.service';

const validations: any = {
  capteur: {
    ref: {},
    type: {},
    photo: {},
  },
};

@Component({
  validations,
})
export default class CapteurUpdate extends mixins(JhiDataUtils) {
  @Inject('capteurService') private capteurService: () => CapteurService;
  @Inject('alertService') private alertService: () => AlertService;

  public capteur: ICapteur = new Capteur();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.capteurId) {
        vm.retrieveCapteur(to.params.capteurId);
      }
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
    if (this.capteur.id) {
      this.capteurService()
        .update(this.capteur)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Capteur is updated with identifier ' + param.id;
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
      this.capteurService()
        .create(this.capteur)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Capteur is created with identifier ' + param.id;
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

  public retrieveCapteur(capteurId): void {
    this.capteurService()
      .find(capteurId)
      .then(res => {
        this.capteur = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.capteur && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.capteur, field)) {
        this.capteur[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.capteur, fieldContentType)) {
        this.capteur[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {}
}
