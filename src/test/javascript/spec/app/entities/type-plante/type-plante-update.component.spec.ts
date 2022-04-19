/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TypePlanteUpdateComponent from '@/entities/type-plante/type-plante-update.vue';
import TypePlanteClass from '@/entities/type-plante/type-plante-update.component';
import TypePlanteService from '@/entities/type-plante/type-plante.service';

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
  describe('TypePlante Management Update Component', () => {
    let wrapper: Wrapper<TypePlanteClass>;
    let comp: TypePlanteClass;
    let typePlanteServiceStub: SinonStubbedInstance<TypePlanteService>;

    beforeEach(() => {
      typePlanteServiceStub = sinon.createStubInstance<TypePlanteService>(TypePlanteService);

      wrapper = shallowMount<TypePlanteClass>(TypePlanteUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          typePlanteService: () => typePlanteServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.typePlante = entity;
        typePlanteServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(typePlanteServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.typePlante = entity;
        typePlanteServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(typePlanteServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTypePlante = { id: 123 };
        typePlanteServiceStub.find.resolves(foundTypePlante);
        typePlanteServiceStub.retrieve.resolves([foundTypePlante]);

        // WHEN
        comp.beforeRouteEnter({ params: { typePlanteId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.typePlante).toBe(foundTypePlante);
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
