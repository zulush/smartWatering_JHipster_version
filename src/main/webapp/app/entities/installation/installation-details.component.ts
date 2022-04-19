import { Component, Vue, Inject } from 'vue-property-decorator';

import { IInstallation } from '@/shared/model/installation.model';
import InstallationService from './installation.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class InstallationDetails extends Vue {
  @Inject('installationService') private installationService: () => InstallationService;
  @Inject('alertService') private alertService: () => AlertService;

  public installation: IInstallation = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.installationId) {
        vm.retrieveInstallation(to.params.installationId);
      }
    });
  }

  public retrieveInstallation(installationId) {
    this.installationService()
      .find(installationId)
      .then(res => {
        this.installation = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
