import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPlante } from '@/shared/model/plante.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import PlanteService from './plante.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Plante extends mixins(JhiDataUtils) {
  @Inject('planteService') private planteService: () => PlanteService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public plantes: IPlante[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPlantes();
  }

  public clear(): void {
    this.retrieveAllPlantes();
  }

  public retrieveAllPlantes(): void {
    this.isFetching = true;
    this.planteService()
      .retrieve()
      .then(
        res => {
          this.plantes = res.data;
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

  public prepareRemove(instance: IPlante): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePlante(): void {
    this.planteService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Plante is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllPlantes();
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
