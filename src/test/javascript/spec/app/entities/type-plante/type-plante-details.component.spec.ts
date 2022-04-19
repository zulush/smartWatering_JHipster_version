/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import TypePlanteDetailComponent from '@/entities/type-plante/type-plante-details.vue';
import TypePlanteClass from '@/entities/type-plante/type-plante-details.component';
import TypePlanteService from '@/entities/type-plante/type-plante.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('TypePlante Management Detail Component', () => {
    let wrapper: Wrapper<TypePlanteClass>;
    let comp: TypePlanteClass;
    let typePlanteServiceStub: SinonStubbedInstance<TypePlanteService>;

    beforeEach(() => {
      typePlanteServiceStub = sinon.createStubInstance<TypePlanteService>(TypePlanteService);

      wrapper = shallowMount<TypePlanteClass>(TypePlanteDetailComponent, {
        store,
        localVue,
        router,
        provide: { typePlanteService: () => typePlanteServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTypePlante = { id: 123 };
        typePlanteServiceStub.find.resolves(foundTypePlante);

        // WHEN
        comp.retrieveTypePlante(123);
        await comp.$nextTick();

        // THEN
        expect(comp.typePlante).toBe(foundTypePlante);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTypePlante = { id: 123 };
        typePlanteServiceStub.find.resolves(foundTypePlante);

        // WHEN
        comp.beforeRouteEnter({ params: { typePlanteId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.typePlante).toBe(foundTypePlante);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
