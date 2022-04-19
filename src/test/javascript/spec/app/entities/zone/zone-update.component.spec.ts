/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ZoneUpdateComponent from '@/entities/zone/zone-update.vue';
import ZoneClass from '@/entities/zone/zone-update.component';
import ZoneService from '@/entities/zone/zone.service';

import NotificationService from '@/entities/notification/notification.service';

import GrandeurService from '@/entities/grandeur/grandeur.service';

import PlantageService from '@/entities/plantage/plantage.service';

import ArrosageService from '@/entities/arrosage/arrosage.service';

import TypeSolService from '@/entities/type-sol/type-sol.service';

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
  describe('Zone Management Update Component', () => {
    let wrapper: Wrapper<ZoneClass>;
    let comp: ZoneClass;
    let zoneServiceStub: SinonStubbedInstance<ZoneService>;

    beforeEach(() => {
      zoneServiceStub = sinon.createStubInstance<ZoneService>(ZoneService);

      wrapper = shallowMount<ZoneClass>(ZoneUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          zoneService: () => zoneServiceStub,
          alertService: () => new AlertService(),

          notificationService: () =>
            sinon.createStubInstance<NotificationService>(NotificationService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          grandeurService: () =>
            sinon.createStubInstance<GrandeurService>(GrandeurService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          plantageService: () =>
            sinon.createStubInstance<PlantageService>(PlantageService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          arrosageService: () =>
            sinon.createStubInstance<ArrosageService>(ArrosageService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          typeSolService: () =>
            sinon.createStubInstance<TypeSolService>(TypeSolService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

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
        comp.zone = entity;
        zoneServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(zoneServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.zone = entity;
        zoneServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(zoneServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundZone = { id: 123 };
        zoneServiceStub.find.resolves(foundZone);
        zoneServiceStub.retrieve.resolves([foundZone]);

        // WHEN
        comp.beforeRouteEnter({ params: { zoneId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.zone).toBe(foundZone);
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
