/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import EspaceVertUpdateComponent from '@/entities/espace-vert/espace-vert-update.vue';
import EspaceVertClass from '@/entities/espace-vert/espace-vert-update.component';
import EspaceVertService from '@/entities/espace-vert/espace-vert.service';

import ZoneService from '@/entities/zone/zone.service';

import ExtraUserService from '@/entities/extra-user/extra-user.service';
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
  describe('EspaceVert Management Update Component', () => {
    let wrapper: Wrapper<EspaceVertClass>;
    let comp: EspaceVertClass;
    let espaceVertServiceStub: SinonStubbedInstance<EspaceVertService>;

    beforeEach(() => {
      espaceVertServiceStub = sinon.createStubInstance<EspaceVertService>(EspaceVertService);

      wrapper = shallowMount<EspaceVertClass>(EspaceVertUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          espaceVertService: () => espaceVertServiceStub,
          alertService: () => new AlertService(),

          zoneService: () =>
            sinon.createStubInstance<ZoneService>(ZoneService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          extraUserService: () =>
            sinon.createStubInstance<ExtraUserService>(ExtraUserService, {
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
        comp.espaceVert = entity;
        espaceVertServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(espaceVertServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.espaceVert = entity;
        espaceVertServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(espaceVertServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundEspaceVert = { id: 123 };
        espaceVertServiceStub.find.resolves(foundEspaceVert);
        espaceVertServiceStub.retrieve.resolves([foundEspaceVert]);

        // WHEN
        comp.beforeRouteEnter({ params: { espaceVertId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.espaceVert).toBe(foundEspaceVert);
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
