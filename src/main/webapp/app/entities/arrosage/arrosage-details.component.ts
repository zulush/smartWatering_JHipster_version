import { Component, Vue, Inject } from 'vue-property-decorator';

import { IArrosage } from '@/shared/model/arrosage.model';
import ArrosageService from './arrosage.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ArrosageDetails extends Vue {
  @Inject('arrosageService') private arrosageService: () => ArrosageService;
  @Inject('alertService') private alertService: () => AlertService;

  public arrosage: IArrosage = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.arrosageId) {
        vm.retrieveArrosage(to.params.arrosageId);
      }
    });
  }

  public retrieveArrosage(arrosageId) {
    this.arrosageService()
      .find(arrosageId)
      .then(res => {
        this.arrosage = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
