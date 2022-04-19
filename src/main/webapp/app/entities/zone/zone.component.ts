import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IZone } from '@/shared/model/zone.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import ZoneService from './zone.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Zone extends mixins(JhiDataUtils) {
  @Inject('zoneService') private zoneService: () => ZoneService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public zones: IZone[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllZones();
  }

  public clear(): void {
    this.retrieveAllZones();
  }

  public retrieveAllZones(): void {
    this.isFetching = true;
    this.zoneService()
      .retrieve()
      .then(
        res => {
          this.zones = res.data;
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

  public prepareRemove(instance: IZone): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeZone(): void {
    this.zoneService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Zone is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllZones();
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
