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
import ma.emsi.smartwatering.domain.Zone;
import ma.emsi.smartwatering.repository.ZoneRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link ZoneResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ZoneResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final Float DEFAULT_SUPERFICIE = 1F;
    private static final Float UPDATED_SUPERFICIE = 2F;

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/zones";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restZoneMockMvc;

    private Zone zone;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Zone createEntity(EntityManager em) {
        Zone zone = new Zone()
            .libelle(DEFAULT_LIBELLE)
            .superficie(DEFAULT_SUPERFICIE)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE);
        return zone;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Zone createUpdatedEntity(EntityManager em) {
        Zone zone = new Zone()
            .libelle(UPDATED_LIBELLE)
            .superficie(UPDATED_SUPERFICIE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);
        return zone;
    }

    @BeforeEach
    public void initTest() {
        zone = createEntity(em);
    }

    @Test
    @Transactional
    void createZone() throws Exception {
        int databaseSizeBeforeCreate = zoneRepository.findAll().size();
        // Create the Zone
        restZoneMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(zone)))
            .andExpect(status().isCreated());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeCreate + 1);
        Zone testZone = zoneList.get(zoneList.size() - 1);
        assertThat(testZone.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testZone.getSuperficie()).isEqualTo(DEFAULT_SUPERFICIE);
        assertThat(testZone.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testZone.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createZoneWithExistingId() throws Exception {
        // Create the Zone with an existing ID
        zone.setId(1L);

        int databaseSizeBeforeCreate = zoneRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restZoneMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(zone)))
            .andExpect(status().isBadRequest());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllZones() throws Exception {
        // Initialize the database
        zoneRepository.saveAndFlush(zone);

        // Get all the zoneList
        restZoneMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zone.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].superficie").value(hasItem(DEFAULT_SUPERFICIE.doubleValue())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))));
    }

    @Test
    @Transactional
    void getZone() throws Exception {
        // Initialize the database
        zoneRepository.saveAndFlush(zone);

        // Get the zone
        restZoneMockMvc
            .perform(get(ENTITY_API_URL_ID, zone.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(zone.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.superficie").value(DEFAULT_SUPERFICIE.doubleValue()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)));
    }

    @Test
    @Transactional
    void getNonExistingZone() throws Exception {
        // Get the zone
        restZoneMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewZone() throws Exception {
        // Initialize the database
        zoneRepository.saveAndFlush(zone);

        int databaseSizeBeforeUpdate = zoneRepository.findAll().size();

        // Update the zone
        Zone updatedZone = zoneRepository.findById(zone.getId()).get();
        // Disconnect from session so that the updates on updatedZone are not directly saved in db
        em.detach(updatedZone);
        updatedZone
            .libelle(UPDATED_LIBELLE)
            .superficie(UPDATED_SUPERFICIE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);

        restZoneMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedZone.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedZone))
            )
            .andExpect(status().isOk());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeUpdate);
        Zone testZone = zoneList.get(zoneList.size() - 1);
        assertThat(testZone.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testZone.getSuperficie()).isEqualTo(UPDATED_SUPERFICIE);
        assertThat(testZone.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testZone.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingZone() throws Exception {
        int databaseSizeBeforeUpdate = zoneRepository.findAll().size();
        zone.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZoneMockMvc
            .perform(
                put(ENTITY_API_URL_ID, zone.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(zone))
            )
            .andExpect(status().isBadRequest());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchZone() throws Exception {
        int databaseSizeBeforeUpdate = zoneRepository.findAll().size();
        zone.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restZoneMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(zone))
            )
            .andExpect(status().isBadRequest());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamZone() throws Exception {
        int databaseSizeBeforeUpdate = zoneRepository.findAll().size();
        zone.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restZoneMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(zone)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateZoneWithPatch() throws Exception {
        // Initialize the database
        zoneRepository.saveAndFlush(zone);

        int databaseSizeBeforeUpdate = zoneRepository.findAll().size();

        // Update the zone using partial update
        Zone partialUpdatedZone = new Zone();
        partialUpdatedZone.setId(zone.getId());

        restZoneMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedZone.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedZone))
            )
            .andExpect(status().isOk());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeUpdate);
        Zone testZone = zoneList.get(zoneList.size() - 1);
        assertThat(testZone.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testZone.getSuperficie()).isEqualTo(DEFAULT_SUPERFICIE);
        assertThat(testZone.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testZone.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateZoneWithPatch() throws Exception {
        // Initialize the database
        zoneRepository.saveAndFlush(zone);

        int databaseSizeBeforeUpdate = zoneRepository.findAll().size();

        // Update the zone using partial update
        Zone partialUpdatedZone = new Zone();
        partialUpdatedZone.setId(zone.getId());

        partialUpdatedZone
            .libelle(UPDATED_LIBELLE)
            .superficie(UPDATED_SUPERFICIE)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);

        restZoneMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedZone.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedZone))
            )
            .andExpect(status().isOk());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeUpdate);
        Zone testZone = zoneList.get(zoneList.size() - 1);
        assertThat(testZone.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testZone.getSuperficie()).isEqualTo(UPDATED_SUPERFICIE);
        assertThat(testZone.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testZone.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingZone() throws Exception {
        int databaseSizeBeforeUpdate = zoneRepository.findAll().size();
        zone.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZoneMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, zone.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(zone))
            )
            .andExpect(status().isBadRequest());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchZone() throws Exception {
        int databaseSizeBeforeUpdate = zoneRepository.findAll().size();
        zone.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restZoneMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(zone))
            )
            .andExpect(status().isBadRequest());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamZone() throws Exception {
        int databaseSizeBeforeUpdate = zoneRepository.findAll().size();
        zone.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restZoneMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(zone)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Zone in the database
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteZone() throws Exception {
        // Initialize the database
        zoneRepository.saveAndFlush(zone);

        int databaseSizeBeforeDelete = zoneRepository.findAll().size();

        // Delete the zone
        restZoneMockMvc
            .perform(delete(ENTITY_API_URL_ID, zone.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Zone> zoneList = zoneRepository.findAll();
        assertThat(zoneList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
