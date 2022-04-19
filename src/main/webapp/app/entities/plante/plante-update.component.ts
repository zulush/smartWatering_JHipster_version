import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import TypePlanteService from '@/entities/type-plante/type-plante.service';
import { ITypePlante } from '@/shared/model/type-plante.model';

import { IPlante, Plante } from '@/shared/model/plante.model';
import PlanteService from './plante.service';

const validations: any = {
  plante: {
    libelle: {
      required,
    },
    photo: {},
    racine: {},
  },
};

@Component({
  validations,
})
export default class PlanteUpdate extends mixins(JhiDataUtils) {
  @Inject('planteService') private planteService: () => PlanteService;
  @Inject('alertService') private alertService: () => AlertService;

  public plante: IPlante = new Plante();

  @Inject('typePlanteService') private typePlanteService: () => TypePlanteService;

  public typePlantes: ITypePlante[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.planteId) {
        vm.retrievePlante(to.params.planteId);
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
    if (this.plante.id) {
      this.planteService()
        .update(this.plante)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Plante is updated with identifier ' + param.id;
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
      this.planteService()
        .create(this.plante)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Plante is created with identifier ' + param.id;
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

  public retrievePlante(planteId): void {
    this.planteService()
      .find(planteId)
      .then(res => {
        this.plante = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.plante && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.plante, field)) {
        this.plante[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.plante, fieldContentType)) {
        this.plante[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.typePlanteService()
      .retrieve()
      .then(res => {
        this.typePlantes = res.data;
      });
  }
}
