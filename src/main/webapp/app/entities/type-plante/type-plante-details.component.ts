import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITypePlante } from '@/shared/model/type-plante.model';
import TypePlanteService from './type-plante.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TypePlanteDetails extends Vue {
  @Inject('typePlanteService') private typePlanteService: () => TypePlanteService;
  @Inject('alertService') private alertService: () => AlertService;

  public typePlante: ITypePlante = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.typePlanteId) {
        vm.retrieveTypePlante(to.params.typePlanteId);
      }
    });
  }

  public retrieveTypePlante(typePlanteId) {
    this.typePlanteService()
      .find(typePlanteId)
      .then(res => {
        this.typePlante = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
