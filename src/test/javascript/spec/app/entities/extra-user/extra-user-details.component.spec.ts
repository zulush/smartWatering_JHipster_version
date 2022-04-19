/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ExtraUserDetailComponent from '@/entities/extra-user/extra-user-details.vue';
import ExtraUserClass from '@/entities/extra-user/extra-user-details.component';
import ExtraUserService from '@/entities/extra-user/extra-user.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ExtraUser Management Detail Component', () => {
    let wrapper: Wrapper<ExtraUserClass>;
    let comp: ExtraUserClass;
    let extraUserServiceStub: SinonStubbedInstance<ExtraUserService>;

    beforeEach(() => {
      extraUserServiceStub = sinon.createStubInstance<ExtraUserService>(ExtraUserService);

      wrapper = shallowMount<ExtraUserClass>(ExtraUserDetailComponent, {
        store,
        localVue,
        router,
        provide: { extraUserService: () => extraUserServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundExtraUser = { id: 123 };
        extraUserServiceStub.find.resolves(foundExtraUser);

        // WHEN
        comp.retrieveExtraUser(123);
        await comp.$nextTick();

        // THEN
        expect(comp.extraUser).toBe(foundExtraUser);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExtraUser = { id: 123 };
        extraUserServiceStub.find.resolves(foundExtraUser);

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
