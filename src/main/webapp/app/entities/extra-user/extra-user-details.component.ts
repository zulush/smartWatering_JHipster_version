import { Component, Vue, Inject } from 'vue-property-decorator';

import { IExtraUser } from '@/shared/model/extra-user.model';
import ExtraUserService from './extra-user.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ExtraUserDetails extends Vue {
  @Inject('extraUserService') private extraUserService: () => ExtraUserService;
  @Inject('alertService') private alertService: () => AlertService;

  public extraUser: IExtraUser = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.extraUserId) {
        vm.retrieveExtraUser(to.params.extraUserId);
      }
    });
  }

  public retrieveExtraUser(extraUserId) {
    this.extraUserService()
      .find(extraUserId)
      .then(res => {
        this.extraUser = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
