import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITypePlante } from '@/shared/model/type-plante.model';

import TypePlanteService from './type-plante.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class TypePlante extends Vue {
  @Inject('typePlanteService') private typePlanteService: () => TypePlanteService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public typePlantes: ITypePlante[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTypePlantes();
  }

  public clear(): void {
    this.retrieveAllTypePlantes();
  }

  public retrieveAllTypePlantes(): void {
    this.isFetching = true;
    this.typePlanteService()
      .retrieve()
      .then(
        res => {
          this.typePlantes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ITypePlante): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTypePlante(): void {
    this.typePlanteService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A TypePlante is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllTypePlantes();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
