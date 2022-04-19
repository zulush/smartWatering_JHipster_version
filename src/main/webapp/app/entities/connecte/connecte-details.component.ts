import { Component, Vue, Inject } from 'vue-property-decorator';

import { IConnecte } from '@/shared/model/connecte.model';
import ConnecteService from './connecte.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ConnecteDetails extends Vue {
  @Inject('connecteService') private connecteService: () => ConnecteService;
  @Inject('alertService') private alertService: () => AlertService;

  public connecte: IConnecte = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.connecteId) {
        vm.retrieveConnecte(to.params.connecteId);
      }
    });
  }

  public retrieveConnecte(connecteId) {
    this.connecteService()
      .find(connecteId)
      .then(res => {
        this.connecte = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
