/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import InstallationDetailComponent from '@/entities/installation/installation-details.vue';
import InstallationClass from '@/entities/installation/installation-details.component';
import InstallationService from '@/entities/installation/installation.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Installation Management Detail Component', () => {
    let wrapper: Wrapper<InstallationClass>;
    let comp: InstallationClass;
    let installationServiceStub: SinonStubbedInstance<InstallationService>;

    beforeEach(() => {
      installationServiceStub = sinon.createStubInstance<InstallationService>(InstallationService);

      wrapper = shallowMount<InstallationClass>(InstallationDetailComponent, {
        store,
        localVue,
        router,
        provide: { installationService: () => installationServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundInstallation = { id: 123 };
        installationServiceStub.find.resolves(foundInstallation);

        // WHEN
        comp.retrieveInstallation(123);
        await comp.$nextTick();

        // THEN
        expect(comp.installation).toBe(foundInstallation);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundInstallation = { id: 123 };
        installationServiceStub.find.resolves(foundInstallation);

        // WHEN
        comp.beforeRouteEnter({ params: { installationId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.installation).toBe(foundInstallation);
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
