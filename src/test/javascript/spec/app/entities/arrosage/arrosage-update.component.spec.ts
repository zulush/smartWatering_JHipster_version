/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import ArrosageUpdateComponent from '@/entities/arrosage/arrosage-update.vue';
import ArrosageClass from '@/entities/arrosage/arrosage-update.component';
import ArrosageService from '@/entities/arrosage/arrosage.service';

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
  describe('Arrosage Management Update Component', () => {
    let wrapper: Wrapper<ArrosageClass>;
    let comp: ArrosageClass;
    let arrosageServiceStub: SinonStubbedInstance<ArrosageService>;

    beforeEach(() => {
      arrosageServiceStub = sinon.createStubInstance<ArrosageService>(ArrosageService);

      wrapper = shallowMount<ArrosageClass>(ArrosageUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          arrosageService: () => arrosageServiceStub,
          alertService: () => new AlertService(),

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
        comp.arrosage = entity;
        arrosageServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(arrosageServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.arrosage = entity;
        arrosageServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(arrosageServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundArrosage = { id: 123 };
        arrosageServiceStub.find.resolves(foundArrosage);
        arrosageServiceStub.retrieve.resolves([foundArrosage]);

        // WHEN
        comp.beforeRouteEnter({ params: { arrosageId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.arrosage).toBe(foundArrosage);
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
