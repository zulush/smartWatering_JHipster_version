import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IConnecte } from '@/shared/model/connecte.model';

import ConnecteService from './connecte.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Connecte extends Vue {
  @Inject('connecteService') private connecteService: () => ConnecteService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public connectes: IConnecte[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllConnectes();
  }

  public clear(): void {
    this.retrieveAllConnectes();
  }

  public retrieveAllConnectes(): void {
    this.isFetching = true;
    this.connecteService()
      .retrieve()
      .then(
        res => {
          this.connectes = res.data;
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

  public prepareRemove(instance: IConnecte): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeConnecte(): void {
    this.connecteService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Connecte is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllConnectes();
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
