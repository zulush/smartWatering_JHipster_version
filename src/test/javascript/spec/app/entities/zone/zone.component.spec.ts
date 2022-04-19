/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ZoneComponent from '@/entities/zone/zone.vue';
import ZoneClass from '@/entities/zone/zone.component';
import ZoneService from '@/entities/zone/zone.service';
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
  describe('Zone Management Component', () => {
    let wrapper: Wrapper<ZoneClass>;
    let comp: ZoneClass;
    let zoneServiceStub: SinonStubbedInstance<ZoneService>;

    beforeEach(() => {
      zoneServiceStub = sinon.createStubInstance<ZoneService>(ZoneService);
      zoneServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ZoneClass>(ZoneComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          zoneService: () => zoneServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      zoneServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllZones();
      await comp.$nextTick();

      // THEN
      expect(zoneServiceStub.retrieve.called).toBeTruthy();
      expect(comp.zones[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      zoneServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(zoneServiceStub.retrieve.callCount).toEqual(1);

      comp.removeZone();
      await comp.$nextTick();

      // THEN
      expect(zoneServiceStub.delete.called).toBeTruthy();
      expect(zoneServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
