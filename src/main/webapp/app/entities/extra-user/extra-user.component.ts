import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IExtraUser } from '@/shared/model/extra-user.model';

import ExtraUserService from './extra-user.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ExtraUser extends Vue {
  @Inject('extraUserService') private extraUserService: () => ExtraUserService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public extraUsers: IExtraUser[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllExtraUsers();
  }

  public clear(): void {
    this.retrieveAllExtraUsers();
  }

  public retrieveAllExtraUsers(): void {
    this.isFetching = true;
    this.extraUserService()
      .retrieve()
      .then(
        res => {
          this.extraUsers = res.data;
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

  public prepareRemove(instance: IExtraUser): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeExtraUser(): void {
    this.extraUserService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A ExtraUser is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllExtraUsers();
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
