import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, decimal } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import ZoneService from '@/entities/zone/zone.service';
import { IZone } from '@/shared/model/zone.model';

import { IGrandeur, Grandeur } from '@/shared/model/grandeur.model';
import GrandeurService from './grandeur.service';

const validations: any = {
  grandeur: {
    type: {
      required,
    },
    valeur: {
      required,
      decimal,
    },
    unite: {
      required,
    },
    date: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class GrandeurUpdate extends Vue {
  @Inject('grandeurService') private grandeurService: () => GrandeurService;
  @Inject('alertService') private alertService: () => AlertService;

  public grandeur: IGrandeur = new Grandeur();

  @Inject('zoneService') private zoneService: () => ZoneService;

  public zones: IZone[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.grandeurId) {
        vm.retrieveGrandeur(to.params.grandeurId);
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
    if (this.grandeur.id) {
      this.grandeurService()
        .update(this.grandeur)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Grandeur is updated with identifier ' + param.id;
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
      this.grandeurService()
        .create(this.grandeur)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Grandeur is created with identifier ' + param.id;
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
      this.grandeur[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.grandeur[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.grandeur[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.grandeur[field] = null;
    }
  }

  public retrieveGrandeur(grandeurId): void {
    this.grandeurService()
      .find(grandeurId)
      .then(res => {
        res.date = new Date(res.date);
        this.grandeur = res;
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
