/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TypePlanteComponent from '@/entities/type-plante/type-plante.vue';
import TypePlanteClass from '@/entities/type-plante/type-plante.component';
import TypePlanteService from '@/entities/type-plante/type-plante.service';
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
  describe('TypePlante Management Component', () => {
    let wrapper: Wrapper<TypePlanteClass>;
    let comp: TypePlanteClass;
    let typePlanteServiceStub: SinonStubbedInstance<TypePlanteService>;

    beforeEach(() => {
      typePlanteServiceStub = sinon.createStubInstance<TypePlanteService>(TypePlanteService);
      typePlanteServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TypePlanteClass>(TypePlanteComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          typePlanteService: () => typePlanteServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      typePlanteServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTypePlantes();
      await comp.$nextTick();

      // THEN
      expect(typePlanteServiceStub.retrieve.called).toBeTruthy();
      expect(comp.typePlantes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      typePlanteServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(typePlanteServiceStub.retrieve.callCount).toEqual(1);

      comp.removeTypePlante();
      await comp.$nextTick();

      // THEN
      expect(typePlanteServiceStub.delete.called).toBeTruthy();
      expect(typePlanteServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
