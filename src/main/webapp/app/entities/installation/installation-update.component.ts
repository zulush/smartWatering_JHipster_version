import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import ZoneService from '@/entities/zone/zone.service';
import { IZone } from '@/shared/model/zone.model';

import BoitierService from '@/entities/boitier/boitier.service';
import { IBoitier } from '@/shared/model/boitier.model';

import { IInstallation, Installation } from '@/shared/model/installation.model';
import InstallationService from './installation.service';

const validations: any = {
  installation: {
    dateDabut: {
      required,
    },
    dateFin: {},
  },
};

@Component({
  validations,
})
export default class InstallationUpdate extends Vue {
  @Inject('installationService') private installationService: () => InstallationService;
  @Inject('alertService') private alertService: () => AlertService;

  public installation: IInstallation = new Installation();

  @Inject('zoneService') private zoneService: () => ZoneService;

  public zones: IZone[] = [];

  @Inject('boitierService') private boitierService: () => BoitierService;

  public boitiers: IBoitier[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.installationId) {
        vm.retrieveInstallation(to.params.installationId);
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
    if (this.installation.id) {
      this.installationService()
        .update(this.installation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Installation is updated with identifier ' + param.id;
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
      this.installationService()
        .create(this.installation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Installation is created with identifier ' + param.id;
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

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.installation[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.installation[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.installation[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.installation[field] = null;
    }
  }

  public retrieveInstallation(installationId): void {
    this.installationService()
      .find(installationId)
      .then(res => {
        res.dateDabut = new Date(res.dateDabut);
        res.dateFin = new Date(res.dateFin);
        this.installation = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.zoneService()
      .retrieve()
      .then(res => {
        this.zones = res.data;
      });
    this.boitierService()
      .retrieve()
      .then(res => {
        this.boitiers = res.data;
      });
  }
}
