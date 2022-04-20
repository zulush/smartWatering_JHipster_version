import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import InstallationService from '@/entities/installation/installation.service';
import { IInstallation } from '@/shared/model/installation.model';

import ConnecteService from '@/entities/connecte/connecte.service';
import { IConnecte } from '@/shared/model/connecte.model';

import { IBoitier, Boitier } from '@/shared/model/boitier.model';
import BoitierService from './boitier.service';

const validations: any = {
  boitier: {
    reference: {
      required,
      numeric,
    },
    type: {},
    nbrBranchBoitier: {},
    nbrBranchArduino: {},
    code: {
      minLength: minLength(64),
    },
  },
};

@Component({
  validations,
})
export default class BoitierUpdate extends Vue {
  @Inject('boitierService') private boitierService: () => BoitierService;
  @Inject('alertService') private alertService: () => AlertService;

  public boitier: IBoitier = new Boitier();

  @Inject('installationService') private installationService: () => InstallationService;

  public installations: IInstallation[] = [];

  @Inject('connecteService') private connecteService: () => ConnecteService;

  public connectes: IConnecte[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.boitierId) {
        vm.retrieveBoitier(to.params.boitierId);
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
    if (this.boitier.id) {
      this.boitierService()
        .update(this.boitier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Boitier is updated with identifier ' + param.id;
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
      this.boitierService()
        .create(this.boitier)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Boitier is created with identifier ' + param.id;
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

  public retrieveBoitier(boitierId): void {
    this.boitierService()
      .find(boitierId)
      .then(res => {
        this.boitier = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.installationService()
      .retrieve()
      .then(res => {
        this.installations = res.data;
      });
    this.connecteService()
      .retrieve()
      .then(res => {
        this.connectes = res.data;
      });
  }
}
