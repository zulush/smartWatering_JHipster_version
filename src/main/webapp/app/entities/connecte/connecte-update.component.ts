import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import CapteurService from '@/entities/capteur/capteur.service';
import { ICapteur } from '@/shared/model/capteur.model';

import BoitierService from '@/entities/boitier/boitier.service';
import { IBoitier } from '@/shared/model/boitier.model';

import { IConnecte, Connecte } from '@/shared/model/connecte.model';
import ConnecteService from './connecte.service';

const validations: any = {
  connecte: {
    fonctionnel: {},
    branche: {},
    frequence: {},
    marge: {},
  },
};

@Component({
  validations,
})
export default class ConnecteUpdate extends Vue {
  @Inject('connecteService') private connecteService: () => ConnecteService;
  @Inject('alertService') private alertService: () => AlertService;

  public connecte: IConnecte = new Connecte();

  @Inject('capteurService') private capteurService: () => CapteurService;

  public capteurs: ICapteur[] = [];

  @Inject('boitierService') private boitierService: () => BoitierService;

  public boitiers: IBoitier[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.connecteId) {
        vm.retrieveConnecte(to.params.connecteId);
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
    if (this.connecte.id) {
      this.connecteService()
        .update(this.connecte)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Connecte is updated with identifier ' + param.id;
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
      this.connecteService()
        .create(this.connecte)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Connecte is created with identifier ' + param.id;
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

  public retrieveConnecte(connecteId): void {
    this.connecteService()
      .find(connecteId)
      .then(res => {
        this.connecte = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.capteurService()
      .retrieve()
      .then(res => {
        this.capteurs = res.data;
      });
    this.boitierService()
      .retrieve()
      .then(res => {
        this.boitiers = res.data;
      });
  }
}
