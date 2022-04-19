/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import EspaceVertDetailComponent from '@/entities/espace-vert/espace-vert-details.vue';
import EspaceVertClass from '@/entities/espace-vert/espace-vert-details.component';
import EspaceVertService from '@/entities/espace-vert/espace-vert.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('EspaceVert Management Detail Component', () => {
    let wrapper: Wrapper<EspaceVertClass>;
    let comp: EspaceVertClass;
    let espaceVertServiceStub: SinonStubbedInstance<EspaceVertService>;

    beforeEach(() => {
      espaceVertServiceStub = sinon.createStubInstance<EspaceVertService>(EspaceVertService);

      wrapper = shallowMount<EspaceVertClass>(EspaceVertDetailComponent, {
        store,
        localVue,
        router,
        provide: { espaceVertService: () => espaceVertServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEspaceVert = { id: 123 };
        espaceVertServiceStub.find.resolves(foundEspaceVert);

        // WHEN
        comp.retrieveEspaceVert(123);
        await comp.$nextTick();

        // THEN
        expect(comp.espaceVert).toBe(foundEspaceVert);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundEspaceVert = { id: 123 };
        espaceVertServiceStub.find.resolves(foundEspaceVert);

        // WHEN
        comp.beforeRouteEnter({ params: { espaceVertId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.espaceVert).toBe(foundEspaceVert);
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
