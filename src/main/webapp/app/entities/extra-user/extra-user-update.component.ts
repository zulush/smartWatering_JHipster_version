import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';

import EspaceVertService from '@/entities/espace-vert/espace-vert.service';
import { IEspaceVert } from '@/shared/model/espace-vert.model';

import { IExtraUser, ExtraUser } from '@/shared/model/extra-user.model';
import ExtraUserService from './extra-user.service';

const validations: any = {
  extraUser: {
    phone: {},
    address: {},
  },
};

@Component({
  validations,
})
export default class ExtraUserUpdate extends Vue {
  @Inject('extraUserService') private extraUserService: () => ExtraUserService;
  @Inject('alertService') private alertService: () => AlertService;

  public extraUser: IExtraUser = new ExtraUser();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('espaceVertService') private espaceVertService: () => EspaceVertService;

  public espaceVerts: IEspaceVert[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.extraUserId) {
        vm.retrieveExtraUser(to.params.extraUserId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.extraUser.id) {
      this.extraUserService()
        .update(this.extraUser)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ExtraUser is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.extraUserService()
        .create(this.extraUser)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ExtraUser is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveExtraUser(extraUserId): void {
    this.extraUserService()
      .find(extraUserId)
      .then(res => {
        this.extraUser = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.espaceVertService()
      .retrieve()
      .then(res => {
        this.espaceVerts = res.data;
      });
  }
}
