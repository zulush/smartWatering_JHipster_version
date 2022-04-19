package ma.emsi.smartwatering.web.rest;

import static ma.emsi.smartwatering.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import ma.emsi.smartwatering.IntegrationTest;
import ma.emsi.smartwatering.domain.Arrosage;
import ma.emsi.smartwatering.repository.ArrosageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ArrosageResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ArrosageResourceIT {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Float DEFAULT_LITRES_EAU = 1F;
    private static final Float UPDATED_LITRES_EAU = 2F;

    private static final String ENTITY_API_URL = "/api/arrosages";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ArrosageRepository arrosageRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restArrosageMockMvc;

    private Arrosage arrosage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Arrosage createEntity(EntityManager em) {
        Arrosage arrosage = new Arrosage().date(DEFAULT_DATE).litresEau(DEFAULT_LITRES_EAU);
        return arrosage;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Arrosage createUpdatedEntity(EntityManager em) {
        Arrosage arrosage = new Arrosage().date(UPDATED_DATE).litresEau(UPDATED_LITRES_EAU);
        return arrosage;
    }

    @BeforeEach
    public void initTest() {
        arrosage = createEntity(em);
    }

    @Test
    @Transactional
    void createArrosage() throws Exception {
        int databaseSizeBeforeCreate = arrosageRepository.findAll().size();
        // Create the Arrosage
        restArrosageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(arrosage)))
            .andExpect(status().isCreated());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeCreate + 1);
        Arrosage testArrosage = arrosageList.get(arrosageList.size() - 1);
        assertThat(testArrosage.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testArrosage.getLitresEau()).isEqualTo(DEFAULT_LITRES_EAU);
    }

    @Test
    @Transactional
    void createArrosageWithExistingId() throws Exception {
        // Create the Arrosage with an existing ID
        arrosage.setId(1L);

        int databaseSizeBeforeCreate = arrosageRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restArrosageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(arrosage)))
            .andExpect(status().isBadRequest());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = arrosageRepository.findAll().size();
        // set the field null
        arrosage.setDate(null);

        // Create the Arrosage, which fails.

        restArrosageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(arrosage)))
            .andExpect(status().isBadRequest());

        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllArrosages() throws Exception {
        // Initialize the database
        arrosageRepository.saveAndFlush(arrosage);

        // Get all the arrosageList
        restArrosageMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(arrosage.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].litresEau").value(hasItem(DEFAULT_LITRES_EAU.doubleValue())));
    }

    @Test
    @Transactional
    void getArrosage() throws Exception {
        // Initialize the database
        arrosageRepository.saveAndFlush(arrosage);

        // Get the arrosage
        restArrosageMockMvc
            .perform(get(ENTITY_API_URL_ID, arrosage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(arrosage.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.litresEau").value(DEFAULT_LITRES_EAU.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingArrosage() throws Exception {
        // Get the arrosage
        restArrosageMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewArrosage() throws Exception {
        // Initialize the database
        arrosageRepository.saveAndFlush(arrosage);

        int databaseSizeBeforeUpdate = arrosageRepository.findAll().size();

        // Update the arrosage
        Arrosage updatedArrosage = arrosageRepository.findById(arrosage.getId()).get();
        // Disconnect from session so that the updates on updatedArrosage are not directly saved in db
        em.detach(updatedArrosage);
        updatedArrosage.date(UPDATED_DATE).litresEau(UPDATED_LITRES_EAU);

        restArrosageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedArrosage.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedArrosage))
            )
            .andExpect(status().isOk());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeUpdate);
        Arrosage testArrosage = arrosageList.get(arrosageList.size() - 1);
        assertThat(testArrosage.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testArrosage.getLitresEau()).isEqualTo(UPDATED_LITRES_EAU);
    }

    @Test
    @Transactional
    void putNonExistingArrosage() throws Exception {
        int databaseSizeBeforeUpdate = arrosageRepository.findAll().size();
        arrosage.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArrosageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, arrosage.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(arrosage))
            )
            .andExpect(status().isBadRequest());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchArrosage() throws Exception {
        int databaseSizeBeforeUpdate = arrosageRepository.findAll().size();
        arrosage.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArrosageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(arrosage))
            )
            .andExpect(status().isBadRequest());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamArrosage() throws Exception {
        int databaseSizeBeforeUpdate = arrosageRepository.findAll().size();
        arrosage.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArrosageMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(arrosage)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateArrosageWithPatch() throws Exception {
        // Initialize the database
        arrosageRepository.saveAndFlush(arrosage);

        int databaseSizeBeforeUpdate = arrosageRepository.findAll().size();

        // Update the arrosage using partial update
        Arrosage partialUpdatedArrosage = new Arrosage();
        partialUpdatedArrosage.setId(arrosage.getId());

        partialUpdatedArrosage.litresEau(UPDATED_LITRES_EAU);

        restArrosageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArrosage.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedArrosage))
            )
            .andExpect(status().isOk());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeUpdate);
        Arrosage testArrosage = arrosageList.get(arrosageList.size() - 1);
        assertThat(testArrosage.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testArrosage.getLitresEau()).isEqualTo(UPDATED_LITRES_EAU);
    }

    @Test
    @Transactional
    void fullUpdateArrosageWithPatch() throws Exception {
        // Initialize the database
        arrosageRepository.saveAndFlush(arrosage);

        int databaseSizeBeforeUpdate = arrosageRepository.findAll().size();

        // Update the arrosage using partial update
        Arrosage partialUpdatedArrosage = new Arrosage();
        partialUpdatedArrosage.setId(arrosage.getId());

        partialUpdatedArrosage.date(UPDATED_DATE).litresEau(UPDATED_LITRES_EAU);

        restArrosageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArrosage.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedArrosage))
            )
            .andExpect(status().isOk());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeUpdate);
        Arrosage testArrosage = arrosageList.get(arrosageList.size() - 1);
        assertThat(testArrosage.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testArrosage.getLitresEau()).isEqualTo(UPDATED_LITRES_EAU);
    }

    @Test
    @Transactional
    void patchNonExistingArrosage() throws Exception {
        int databaseSizeBeforeUpdate = arrosageRepository.findAll().size();
        arrosage.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArrosageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, arrosage.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(arrosage))
            )
            .andExpect(status().isBadRequest());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchArrosage() throws Exception {
        int databaseSizeBeforeUpdate = arrosageRepository.findAll().size();
        arrosage.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArrosageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(arrosage))
            )
            .andExpect(status().isBadRequest());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamArrosage() throws Exception {
        int databaseSizeBeforeUpdate = arrosageRepository.findAll().size();
        arrosage.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArrosageMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(arrosage)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Arrosage in the database
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteArrosage() throws Exception {
        // Initialize the database
        arrosageRepository.saveAndFlush(arrosage);

        int databaseSizeBeforeDelete = arrosageRepository.findAll().size();

        // Delete the arrosage
        restArrosageMockMvc
            .perform(delete(ENTITY_API_URL_ID, arrosage.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Arrosage> arrosageList = arrosageRepository.findAll();
        assertThat(arrosageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
