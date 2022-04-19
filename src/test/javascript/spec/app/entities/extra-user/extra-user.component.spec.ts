/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ExtraUserComponent from '@/entities/extra-user/extra-user.vue';
import ExtraUserClass from '@/entities/extra-user/extra-user.component';
import ExtraUserService from '@/entities/extra-user/extra-user.service';
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
  describe('ExtraUser Management Component', () => {
    let wrapper: Wrapper<ExtraUserClass>;
    let comp: ExtraUserClass;
    let extraUserServiceStub: SinonStubbedInstance<ExtraUserService>;

    beforeEach(() => {
      extraUserServiceStub = sinon.createStubInstance<ExtraUserService>(ExtraUserService);
      extraUserServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ExtraUserClass>(ExtraUserComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          extraUserService: () => extraUserServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      extraUserServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllExtraUsers();
      await comp.$nextTick();

      // THEN
      expect(extraUserServiceStub.retrieve.called).toBeTruthy();
      expect(comp.extraUsers[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      extraUserServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(extraUserServiceStub.retrieve.callCount).toEqual(1);

      comp.removeExtraUser();
      await comp.$nextTick();

      // THEN
      expect(extraUserServiceStub.delete.called).toBeTruthy();
      expect(extraUserServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
