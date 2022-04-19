/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ArrosageComponent from '@/entities/arrosage/arrosage.vue';
import ArrosageClass from '@/entities/arrosage/arrosage.component';
import ArrosageService from '@/entities/arrosage/arrosage.service';
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
  describe('Arrosage Management Component', () => {
    let wrapper: Wrapper<ArrosageClass>;
    let comp: ArrosageClass;
    let arrosageServiceStub: SinonStubbedInstance<ArrosageService>;

    beforeEach(() => {
      arrosageServiceStub = sinon.createStubInstance<ArrosageService>(ArrosageService);
      arrosageServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ArrosageClass>(ArrosageComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          arrosageService: () => arrosageServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      arrosageServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllArrosages();
      await comp.$nextTick();

      // THEN
      expect(arrosageServiceStub.retrieve.called).toBeTruthy();
      expect(comp.arrosages[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      arrosageServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(arrosageServiceStub.retrieve.callCount).toEqual(1);

      comp.removeArrosage();
      await comp.$nextTick();

      // THEN
      expect(arrosageServiceStub.delete.called).toBeTruthy();
      expect(arrosageServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
