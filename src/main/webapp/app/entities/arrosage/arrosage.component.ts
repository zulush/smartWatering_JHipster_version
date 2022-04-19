import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IArrosage } from '@/shared/model/arrosage.model';

import ArrosageService from './arrosage.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Arrosage extends Vue {
  @Inject('arrosageService') private arrosageService: () => ArrosageService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public arrosages: IArrosage[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllArrosages();
  }

  public clear(): void {
    this.retrieveAllArrosages();
  }

  public retrieveAllArrosages(): void {
    this.isFetching = true;
    this.arrosageService()
      .retrieve()
      .then(
        res => {
          this.arrosages = res.data;
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

  public prepareRemove(instance: IArrosage): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeArrosage(): void {
    this.arrosageService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Arrosage is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllArrosages();
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
