import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, numeric } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import PlanteService from '@/entities/plante/plante.service';
import { IPlante } from '@/shared/model/plante.model';

import ZoneService from '@/entities/zone/zone.service';
import { IZone } from '@/shared/model/zone.model';

import { IPlantage, Plantage } from '@/shared/model/plantage.model';
import PlantageService from './plantage.service';

const validations: any = {
  plantage: {
    date: {
      required,
    },
    nombre: {
      required,
      numeric,
    },
  },
};

@Component({
  validations,
})
export default class PlantageUpdate extends Vue {
  @Inject('plantageService') private plantageService: () => PlantageService;
  @Inject('alertService') private alertService: () => AlertService;

  public plantage: IPlantage = new Plantage();

  @Inject('planteService') private planteService: () => PlanteService;

  public plantes: IPlante[] = [];

  @Inject('zoneService') private zoneService: () => ZoneService;

  public zones: IZone[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.plantageId) {
        vm.retrievePlantage(to.params.plantageId);
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
    if (this.plantage.id) {
      this.plantageService()
        .update(this.plantage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Plantage is updated with identifier ' + param.id;
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
      this.plantageService()
        .create(this.plantage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Plantage is created with identifier ' + param.id;
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
      this.plantage[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.plantage[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.plantage[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.plantage[field] = null;
    }
  }

  public retrievePlantage(plantageId): void {
    this.plantageService()
      .find(plantageId)
      .then(res => {
        res.date = new Date(res.date);
        this.plantage = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.planteService()
      .retrieve()
      .then(res => {
        this.plantes = res.data;
      });
    this.zoneService()
      .retrieve()
      .then(res => {
        this.zones = res.data;
      });
  }
}
