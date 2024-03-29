import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { ITypeSol, TypeSol } from '@/shared/model/type-sol.model';
import TypeSolService from './type-sol.service';

const validations: any = {
  typeSol: {
    lebelle: {
      required,
    },
    description: {},
  },
};

@Component({
  validations,
})
export default class TypeSolUpdate extends Vue {
  @Inject('typeSolService') private typeSolService: () => TypeSolService;
  @Inject('alertService') private alertService: () => AlertService;

  public typeSol: ITypeSol = new TypeSol();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.typeSolId) {
        vm.retrieveTypeSol(to.params.typeSolId);
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
    if (this.typeSol.id) {
      this.typeSolService()
        .update(this.typeSol)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TypeSol is updated with identifier ' + param.id;
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
      this.typeSolService()
        .create(this.typeSol)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TypeSol is created with identifier ' + param.id;
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

  public retrieveTypeSol(typeSolId): void {
    this.typeSolService()
      .find(typeSolId)
      .then(res => {
        this.typeSol = res;
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
