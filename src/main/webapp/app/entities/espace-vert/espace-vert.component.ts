import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IEspaceVert } from '@/shared/model/espace-vert.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import EspaceVertService from './espace-vert.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class EspaceVert extends mixins(JhiDataUtils) {
  @Inject('espaceVertService') private espaceVertService: () => EspaceVertService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public espaceVerts: IEspaceVert[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllEspaceVerts();
  }

  public clear(): void {
    this.retrieveAllEspaceVerts();
  }

  public retrieveAllEspaceVerts(): void {
    this.isFetching = true;
    this.espaceVertService()
      .retrieve()
      .then(
        res => {
          this.espaceVerts = res.data;
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

  public prepareRemove(instance: IEspaceVert): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeEspaceVert(): void {
    this.espaceVertService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A EspaceVert is deleted with identifier ' + this.removeId;
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllEspaceVerts();
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
