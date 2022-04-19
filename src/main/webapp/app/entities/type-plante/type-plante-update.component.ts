import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, decimal } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { ITypePlante, TypePlante } from '@/shared/model/type-plante.model';
import TypePlanteService from './type-plante.service';

const validations: any = {
  typePlante: {
    libelle: {
      required,
    },
    humiditeMax: {},
    humiditeMin: {
      required,
      decimal,
    },
    temperature: {},
    luminosite: {},
  },
};

@Component({
  validations,
})
export default class TypePlanteUpdate extends Vue {
  @Inject('typePlanteService') private typePlanteService: () => TypePlanteService;
  @Inject('alertService') private alertService: () => AlertService;

  public typePlante: ITypePlante = new TypePlante();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.typePlanteId) {
        vm.retrieveTypePlante(to.params.typePlanteId);
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
    if (this.typePlante.id) {
      this.typePlanteService()
        .update(this.typePlante)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TypePlante is updated with identifier ' + param.id;
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
      this.typePlanteService()
        .create(this.typePlante)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TypePlante is created with identifier ' + param.id;
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

  public retrieveTypePlante(typePlanteId): void {
    this.typePlanteService()
      .find(typePlanteId)
      .then(res => {
        this.typePlante = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
