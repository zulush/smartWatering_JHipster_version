/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import EspaceVertComponent from '@/entities/espace-vert/espace-vert.vue';
import EspaceVertClass from '@/entities/espace-vert/espace-vert.component';
import EspaceVertService from '@/entities/espace-vert/espace-vert.service';
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
  describe('EspaceVert Management Component', () => {
    let wrapper: Wrapper<EspaceVertClass>;
    let comp: EspaceVertClass;
    let espaceVertServiceStub: SinonStubbedInstance<EspaceVertService>;

    beforeEach(() => {
      espaceVertServiceStub = sinon.createStubInstance<EspaceVertService>(EspaceVertService);
      espaceVertServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EspaceVertClass>(EspaceVertComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          espaceVertService: () => espaceVertServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      espaceVertServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEspaceVerts();
      await comp.$nextTick();

      // THEN
      expect(espaceVertServiceStub.retrieve.called).toBeTruthy();
      expect(comp.espaceVerts[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      espaceVertServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(espaceVertServiceStub.retrieve.callCount).toEqual(1);

      comp.removeEspaceVert();
      await comp.$nextTick();

      // THEN
      expect(espaceVertServiceStub.delete.called).toBeTruthy();
      expect(espaceVertServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
