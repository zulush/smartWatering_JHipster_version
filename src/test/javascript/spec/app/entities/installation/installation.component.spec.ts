/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import InstallationComponent from '@/entities/installation/installation.vue';
import InstallationClass from '@/entities/installation/installation.component';
import InstallationService from '@/entities/installation/installation.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Installation Management Component', () => {
    let wrapper: Wrapper<InstallationClass>;
    let comp: InstallationClass;
    let installationServiceStub: SinonStubbedInstance<InstallationService>;

    beforeEach(() => {
      installationServiceStub = sinon.createStubInstance<InstallationService>(InstallationService);
      installationServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<InstallationClass>(InstallationComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          installationService: () => installationServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      installationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllInstallations();
      await comp.$nextTick();

      // THEN
      expect(installationServiceStub.retrieve.called).toBeTruthy();
      expect(comp.installations[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      installationServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(installationServiceStub.retrieve.callCount).toEqual(1);

      comp.removeInstallation();
      await comp.$nextTick();

      // THEN
      expect(installationServiceStub.delete.called).toBeTruthy();
      expect(installationServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
