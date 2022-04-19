/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ConnecteDetailComponent from '@/entities/connecte/connecte-details.vue';
import ConnecteClass from '@/entities/connecte/connecte-details.component';
import ConnecteService from '@/entities/connecte/connecte.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Connecte Management Detail Component', () => {
    let wrapper: Wrapper<ConnecteClass>;
    let comp: ConnecteClass;
    let connecteServiceStub: SinonStubbedInstance<ConnecteService>;

    beforeEach(() => {
      connecteServiceStub = sinon.createStubInstance<ConnecteService>(ConnecteService);

      wrapper = shallowMount<ConnecteClass>(ConnecteDetailComponent, {
        store,
        localVue,
        router,
        provide: { connecteService: () => connecteServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundConnecte = { id: 123 };
        connecteServiceStub.find.resolves(foundConnecte);

        // WHEN
        comp.retrieveConnecte(123);
        await comp.$nextTick();

        // THEN
        expect(comp.connecte).toBe(foundConnecte);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundConnecte = { id: 123 };
        connecteServiceStub.find.resolves(foundConnecte);

        // WHEN
        comp.beforeRouteEnter({ params: { connecteId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.connecte).toBe(foundConnecte);
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
