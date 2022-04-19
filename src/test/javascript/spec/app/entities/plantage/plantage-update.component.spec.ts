/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import PlantageUpdateComponent from '@/entities/plantage/plantage-update.vue';
import PlantageClass from '@/entities/plantage/plantage-update.component';
import PlantageService from '@/entities/plantage/plantage.service';

import PlanteService from '@/entities/plante/plante.service';

import ZoneService from '@/entities/zone/zone.service';
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
  describe('Plantage Management Update Component', () => {
    let wrapper: Wrapper<PlantageClass>;
    let comp: PlantageClass;
    let plantageServiceStub: SinonStubbedInstance<PlantageService>;

    beforeEach(() => {
      plantageServiceStub = sinon.createStubInstance<PlantageService>(PlantageService);

      wrapper = shallowMount<PlantageClass>(PlantageUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          plantageService: () => plantageServiceStub,
          alertService: () => new AlertService(),

          planteService: () =>
            sinon.createStubInstance<PlanteService>(PlanteService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          zoneService: () =>
            sinon.createStubInstance<ZoneService>(ZoneService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.plantage = entity;
        plantageServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(plantageServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.plantage = entity;
        plantageServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(plantageServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundPlantage = { id: 123 };
        plantageServiceStub.find.resolves(foundPlantage);
        plantageServiceStub.retrieve.resolves([foundPlantage]);

        // WHEN
        comp.beforeRouteEnter({ params: { plantageId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.plantage).toBe(foundPlantage);
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
