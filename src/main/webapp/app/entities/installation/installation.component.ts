import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IInstallation } from '@/shared/model/installation.model';

import InstallationService from './installation.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Installation extends Vue {
  @Inject('installationService') private installationService: () => InstallationService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public installations: IInstallation[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllInstallations();
  }

  public clear(): void {
    this.retrieveAllInstallations();
  }

  public retrieveAllInstallations(): void {
    this.isFetching = true;
    this.installationService()
      .retrieve()
      .then(
        res => {
          this.installations = res.data;
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

  public prepareRemove(instance: IInstallation): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeInstallation(): void {
    this.installationService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Installation is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllInstallations();
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
