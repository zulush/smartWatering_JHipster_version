import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IZone } from '@/shared/model/zone.model';
import ZoneService from './zone.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ZoneDetails extends mixins(JhiDataUtils) {
  @Inject('zoneService') private zoneService: () => ZoneService;
  @Inject('alertService') private alertService: () => AlertService;

  public zone: IZone = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.zoneId) {
        vm.retrieveZone(to.params.zoneId);
      }
    });
  }

  public retrieveZone(zoneId) {
    this.zoneService()
      .find(zoneId)
      .then(res => {
        this.zone = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
