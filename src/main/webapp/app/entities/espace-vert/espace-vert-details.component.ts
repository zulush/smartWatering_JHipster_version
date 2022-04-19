import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IEspaceVert } from '@/shared/model/espace-vert.model';
import EspaceVertService from './espace-vert.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class EspaceVertDetails extends mixins(JhiDataUtils) {
  @Inject('espaceVertService') private espaceVertService: () => EspaceVertService;
  @Inject('alertService') private alertService: () => AlertService;

  public espaceVert: IEspaceVert = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.espaceVertId) {
        vm.retrieveEspaceVert(to.params.espaceVertId);
      }
    });
  }

  public retrieveEspaceVert(espaceVertId) {
    this.espaceVertService()
      .find(espaceVertId)
      .then(res => {
        this.espaceVert = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
