/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ArrosageDetailComponent from '@/entities/arrosage/arrosage-details.vue';
import ArrosageClass from '@/entities/arrosage/arrosage-details.component';
import ArrosageService from '@/entities/arrosage/arrosage.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Arrosage Management Detail Component', () => {
    let wrapper: Wrapper<ArrosageClass>;
    let comp: ArrosageClass;
    let arrosageServiceStub: SinonStubbedInstance<ArrosageService>;

    beforeEach(() => {
      arrosageServiceStub = sinon.createStubInstance<ArrosageService>(ArrosageService);

      wrapper = shallowMount<ArrosageClass>(ArrosageDetailComponent, {
        store,
        localVue,
        router,
        provide: { arrosageService: () => arrosageServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundArrosage = { id: 123 };
        arrosageServiceStub.find.resolves(foundArrosage);

        // WHEN
        comp.retrieveArrosage(123);
        await comp.$nextTick();

        // THEN
        expect(comp.arrosage).toBe(foundArrosage);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundArrosage = { id: 123 };
        arrosageServiceStub.find.resolves(foundArrosage);

        // WHEN
        comp.beforeRouteEnter({ params: { arrosageId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.arrosage).toBe(foundArrosage);
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
