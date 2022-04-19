/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ZoneDetailComponent from '@/entities/zone/zone-details.vue';
import ZoneClass from '@/entities/zone/zone-details.component';
import ZoneService from '@/entities/zone/zone.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Zone Management Detail Component', () => {
    let wrapper: Wrapper<ZoneClass>;
    let comp: ZoneClass;
    let zoneServiceStub: SinonStubbedInstance<ZoneService>;

    beforeEach(() => {
      zoneServiceStub = sinon.createStubInstance<ZoneService>(ZoneService);

      wrapper = shallowMount<ZoneClass>(ZoneDetailComponent, {
        store,
        localVue,
        router,
        provide: { zoneService: () => zoneServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundZone = { id: 123 };
        zoneServiceStub.find.resolves(foundZone);

        // WHEN
        comp.retrieveZone(123);
        await comp.$nextTick();

        // THEN
        expect(comp.zone).toBe(foundZone);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundZone = { id: 123 };
        zoneServiceStub.find.resolves(foundZone);

        // WHEN
        comp.beforeRouteEnter({ params: { zoneId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.zone).toBe(foundZone);
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
