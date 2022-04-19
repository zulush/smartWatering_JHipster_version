/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ExtraUserUpdateComponent from '@/entities/extra-user/extra-user-update.vue';
import ExtraUserClass from '@/entities/extra-user/extra-user-update.component';
import ExtraUserService from '@/entities/extra-user/extra-user.service';

import UserService from '@/entities/user/user.service';

import EspaceVertService from '@/entities/espace-vert/espace-vert.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('ExtraUser Management Update Component', () => {
    let wrapper: Wrapper<ExtraUserClass>;
    let comp: ExtraUserClass;
    let extraUserServiceStub: SinonStubbedInstance<ExtraUserService>;

    beforeEach(() => {
      extraUserServiceStub = sinon.createStubInstance<ExtraUserService>(ExtraUserService);

      wrapper = shallowMount<ExtraUserClass>(ExtraUserUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          extraUserService: () => extraUserServiceStub,
          alertService: () => new AlertService(),

          userService: () => new UserService(),

          espaceVertService: () =>
            sinon.createStubInstance<EspaceVertService>(EspaceVertService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.extraUser = entity;
        extraUserServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(extraUserServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.extraUser = entity;
        extraUserServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(extraUserServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExtraUser = { id: 123 };
        extraUserServiceStub.find.resolves(foundExtraUser);
        extraUserServiceStub.retrieve.resolves([foundExtraUser]);

        // WHEN
        comp.beforeRouteEnter({ params: { extraUserId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.extraUser).toBe(foundExtraUser);
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
