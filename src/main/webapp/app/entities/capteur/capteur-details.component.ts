import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { ICapteur } from '@/shared/model/capteur.model';
import CapteurService from './capteur.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CapteurDetails extends mixins(JhiDataUtils) {
  @Inject('capteurService') private capteurService: () => CapteurService;
  @Inject('alertService') private alertService: () => AlertService;

  public capteur: ICapteur = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.capteurId) {
        vm.retrieveCapteur(to.params.capteurId);
      }
    });
  }

  public retrieveCapteur(capteurId) {
    this.capteurService()
      .find(capteurId)
      .then(res => {
        this.capteur = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
