import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { INotification } from '@/shared/model/notification.model';

import NotificationService from './notification.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Notification extends Vue {
  @Inject('notificationService') private notificationService: () => NotificationService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public notifications: INotification[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllNotifications();
  }

  public clear(): void {
    this.retrieveAllNotifications();
  }

  public retrieveAllNotifications(): void {
    this.isFetching = true;
    this.notificationService()
      .retrieve()
      .then(
        res => {
          this.notifications = res.data;
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

  public prepareRemove(instance: INotification): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeNotification(): void {
    this.notificationService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Notification is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllNotifications();
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
