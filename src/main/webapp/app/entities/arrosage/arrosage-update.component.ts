import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import ZoneService from '@/entities/zone/zone.service';
import { IZone } from '@/shared/model/zone.model';

import { IArrosage, Arrosage } from '@/shared/model/arrosage.model';
import ArrosageService from './arrosage.service';

const validations: any = {
  arrosage: {
    date: {
      required,
    },
    litresEau: {},
  },
};

@Component({
  validations,
})
export default class ArrosageUpdate extends Vue {
  @Inject('arrosageService') private arrosageService: () => ArrosageService;
  @Inject('alertService') private alertService: () => AlertService;

  public arrosage: IArrosage = new Arrosage();

  @Inject('zoneService') private zoneService: () => ZoneService;

  public zones: IZone[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.arrosageId) {
        vm.retrieveArrosage(to.params.arrosageId);
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
    if (this.arrosage.id) {
      this.arrosageService()
        .update(this.arrosage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Arrosage is updated with identifier ' + param.id;
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
      this.arrosageService()
        .create(this.arrosage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Arrosage is created with identifier ' + param.id;
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
      this.arrosage[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.arrosage[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.arrosage[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.arrosage[field] = null;
    }
  }

  public retrieveArrosage(arrosageId): void {
    this.arrosageService()
      .find(arrosageId)
      .then(res => {
        res.date = new Date(res.date);
        this.arrosage = res;
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
  }
}
