/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ConnecteComponent from '@/entities/connecte/connecte.vue';
import ConnecteClass from '@/entities/connecte/connecte.component';
import ConnecteService from '@/entities/connecte/connecte.service';
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
  describe('Connecte Management Component', () => {
    let wrapper: Wrapper<ConnecteClass>;
    let comp: ConnecteClass;
    let connecteServiceStub: SinonStubbedInstance<ConnecteService>;

    beforeEach(() => {
      connecteServiceStub = sinon.createStubInstance<ConnecteService>(ConnecteService);
      connecteServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ConnecteClass>(ConnecteComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          connecteService: () => connecteServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      connecteServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllConnectes();
      await comp.$nextTick();

      // THEN
      expect(connecteServiceStub.retrieve.called).toBeTruthy();
      expect(comp.connectes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      connecteServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(connecteServiceStub.retrieve.callCount).toEqual(1);

      comp.removeConnecte();
      await comp.$nextTick();

      // THEN
      expect(connecteServiceStub.delete.called).toBeTruthy();
      expect(connecteServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
