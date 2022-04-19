/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ConnecteUpdateComponent from '@/entities/connecte/connecte-update.vue';
import ConnecteClass from '@/entities/connecte/connecte-update.component';
import ConnecteService from '@/entities/connecte/connecte.service';

import CapteurService from '@/entities/capteur/capteur.service';

import BoitierService from '@/entities/boitier/boitier.service';
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
  describe('Connecte Management Update Component', () => {
    let wrapper: Wrapper<ConnecteClass>;
    let comp: ConnecteClass;
    let connecteServiceStub: SinonStubbedInstance<ConnecteService>;

    beforeEach(() => {
      connecteServiceStub = sinon.createStubInstance<ConnecteService>(ConnecteService);

      wrapper = shallowMount<ConnecteClass>(ConnecteUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          connecteService: () => connecteServiceStub,
          alertService: () => new AlertService(),

          capteurService: () =>
            sinon.createStubInstance<CapteurService>(CapteurService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          boitierService: () =>
            sinon.createStubInstance<BoitierService>(BoitierService, {
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
        comp.connecte = entity;
        connecteServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(connecteServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.connecte = entity;
        connecteServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(connecteServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundConnecte = { id: 123 };
        connecteServiceStub.find.resolves(foundConnecte);
        connecteServiceStub.retrieve.resolves([foundConnecte]);

        // WHEN
        comp.beforeRouteEnter({ params: { connecteId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.connecte).toBe(foundConnecte);
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
