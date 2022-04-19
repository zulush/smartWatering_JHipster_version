package ma.emsi.smartwatering.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import ma.emsi.smartwatering.IntegrationTest;
import ma.emsi.smartwatering.domain.TypeSol;
import ma.emsi.smartwatering.repository.TypeSolRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TypeSolResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TypeSolResourceIT {

    private static final String DEFAULT_LEBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LEBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/type-sols";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TypeSolRepository typeSolRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeSolMockMvc;

    private TypeSol typeSol;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeSol createEntity(EntityManager em) {
        TypeSol typeSol = new TypeSol().lebelle(DEFAULT_LEBELLE).description(DEFAULT_DESCRIPTION);
        return typeSol;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeSol createUpdatedEntity(EntityManager em) {
        TypeSol typeSol = new TypeSol().lebelle(UPDATED_LEBELLE).description(UPDATED_DESCRIPTION);
        return typeSol;
    }

    @BeforeEach
    public void initTest() {
        typeSol = createEntity(em);
    }

    @Test
    @Transactional
    void createTypeSol() throws Exception {
        int databaseSizeBeforeCreate = typeSolRepository.findAll().size();
        // Create the TypeSol
        restTypeSolMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeSol)))
            .andExpect(status().isCreated());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeCreate + 1);
        TypeSol testTypeSol = typeSolList.get(typeSolList.size() - 1);
        assertThat(testTypeSol.getLebelle()).isEqualTo(DEFAULT_LEBELLE);
        assertThat(testTypeSol.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createTypeSolWithExistingId() throws Exception {
        // Create the TypeSol with an existing ID
        typeSol.setId(1L);

        int databaseSizeBeforeCreate = typeSolRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeSolMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeSol)))
            .andExpect(status().isBadRequest());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkLebelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeSolRepository.findAll().size();
        // set the field null
        typeSol.setLebelle(null);

        // Create the TypeSol, which fails.

        restTypeSolMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeSol)))
            .andExpect(status().isBadRequest());

        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTypeSols() throws Exception {
        // Initialize the database
        typeSolRepository.saveAndFlush(typeSol);

        // Get all the typeSolList
        restTypeSolMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeSol.getId().intValue())))
            .andExpect(jsonPath("$.[*].lebelle").value(hasItem(DEFAULT_LEBELLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getTypeSol() throws Exception {
        // Initialize the database
        typeSolRepository.saveAndFlush(typeSol);

        // Get the typeSol
        restTypeSolMockMvc
            .perform(get(ENTITY_API_URL_ID, typeSol.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeSol.getId().intValue()))
            .andExpect(jsonPath("$.lebelle").value(DEFAULT_LEBELLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingTypeSol() throws Exception {
        // Get the typeSol
        restTypeSolMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTypeSol() throws Exception {
        // Initialize the database
        typeSolRepository.saveAndFlush(typeSol);

        int databaseSizeBeforeUpdate = typeSolRepository.findAll().size();

        // Update the typeSol
        TypeSol updatedTypeSol = typeSolRepository.findById(typeSol.getId()).get();
        // Disconnect from session so that the updates on updatedTypeSol are not directly saved in db
        em.detach(updatedTypeSol);
        updatedTypeSol.lebelle(UPDATED_LEBELLE).description(UPDATED_DESCRIPTION);

        restTypeSolMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTypeSol.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTypeSol))
            )
            .andExpect(status().isOk());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeUpdate);
        TypeSol testTypeSol = typeSolList.get(typeSolList.size() - 1);
        assertThat(testTypeSol.getLebelle()).isEqualTo(UPDATED_LEBELLE);
        assertThat(testTypeSol.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingTypeSol() throws Exception {
        int databaseSizeBeforeUpdate = typeSolRepository.findAll().size();
        typeSol.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeSolMockMvc
            .perform(
                put(ENTITY_API_URL_ID, typeSol.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeSol))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTypeSol() throws Exception {
        int databaseSizeBeforeUpdate = typeSolRepository.findAll().size();
        typeSol.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeSolMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeSol))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTypeSol() throws Exception {
        int databaseSizeBeforeUpdate = typeSolRepository.findAll().size();
        typeSol.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeSolMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeSol)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTypeSolWithPatch() throws Exception {
        // Initialize the database
        typeSolRepository.saveAndFlush(typeSol);

        int databaseSizeBeforeUpdate = typeSolRepository.findAll().size();

        // Update the typeSol using partial update
        TypeSol partialUpdatedTypeSol = new TypeSol();
        partialUpdatedTypeSol.setId(typeSol.getId());

        partialUpdatedTypeSol.lebelle(UPDATED_LEBELLE);

        restTypeSolMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeSol.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeSol))
            )
            .andExpect(status().isOk());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeUpdate);
        TypeSol testTypeSol = typeSolList.get(typeSolList.size() - 1);
        assertThat(testTypeSol.getLebelle()).isEqualTo(UPDATED_LEBELLE);
        assertThat(testTypeSol.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateTypeSolWithPatch() throws Exception {
        // Initialize the database
        typeSolRepository.saveAndFlush(typeSol);

        int databaseSizeBeforeUpdate = typeSolRepository.findAll().size();

        // Update the typeSol using partial update
        TypeSol partialUpdatedTypeSol = new TypeSol();
        partialUpdatedTypeSol.setId(typeSol.getId());

        partialUpdatedTypeSol.lebelle(UPDATED_LEBELLE).description(UPDATED_DESCRIPTION);

        restTypeSolMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeSol.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeSol))
            )
            .andExpect(status().isOk());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeUpdate);
        TypeSol testTypeSol = typeSolList.get(typeSolList.size() - 1);
        assertThat(testTypeSol.getLebelle()).isEqualTo(UPDATED_LEBELLE);
        assertThat(testTypeSol.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingTypeSol() throws Exception {
        int databaseSizeBeforeUpdate = typeSolRepository.findAll().size();
        typeSol.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeSolMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, typeSol.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeSol))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTypeSol() throws Exception {
        int databaseSizeBeforeUpdate = typeSolRepository.findAll().size();
        typeSol.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeSolMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeSol))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTypeSol() throws Exception {
        int databaseSizeBeforeUpdate = typeSolRepository.findAll().size();
        typeSol.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeSolMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(typeSol)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeSol in the database
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTypeSol() throws Exception {
        // Initialize the database
        typeSolRepository.saveAndFlush(typeSol);

        int databaseSizeBeforeDelete = typeSolRepository.findAll().size();

        // Delete the typeSol
        restTypeSolMockMvc
            .perform(delete(ENTITY_API_URL_ID, typeSol.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeSol> typeSolList = typeSolRepository.findAll();
        assertThat(typeSolList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
