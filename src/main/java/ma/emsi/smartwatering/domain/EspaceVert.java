package ma.emsi.smartwatering.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EspaceVert.
 */
@Entity
@Table(name = "espace_vert")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EspaceVert implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "lebelle")
    private String lebelle;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @OneToMany(mappedBy = "espaceVert")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "notifications", "grandeurs", "plantages", "arrosages", "typeSol", "espaceVert" }, allowSetters = true)
    private Set<Zone> zones = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "internalUser", "espaceVerts" }, allowSetters = true)
    private ExtraUser extraUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EspaceVert id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLebelle() {
        return this.lebelle;
    }

    public EspaceVert lebelle(String lebelle) {
        this.setLebelle(lebelle);
        return this;
    }

    public void setLebelle(String lebelle) {
        this.lebelle = lebelle;
    }

    public byte[] getPhoto() {
        return this.photo;
    }

    public EspaceVert photo(byte[] photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return this.photoContentType;
    }

    public EspaceVert photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Set<Zone> getZones() {
        return this.zones;
    }

    public void setZones(Set<Zone> zones) {
        if (this.zones != null) {
            this.zones.forEach(i -> i.setEspaceVert(null));
        }
        if (zones != null) {
            zones.forEach(i -> i.setEspaceVert(this));
        }
        this.zones = zones;
    }

    public EspaceVert zones(Set<Zone> zones) {
        this.setZones(zones);
        return this;
    }

    public EspaceVert addZone(Zone zone) {
        this.zones.add(zone);
        zone.setEspaceVert(this);
        return this;
    }

    public EspaceVert removeZone(Zone zone) {
        this.zones.remove(zone);
        zone.setEspaceVert(null);
        return this;
    }

    public ExtraUser getExtraUser() {
        return this.extraUser;
    }

    public void setExtraUser(ExtraUser extraUser) {
        this.extraUser = extraUser;
    }

    public EspaceVert extraUser(ExtraUser extraUser) {
        this.setExtraUser(extraUser);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EspaceVert)) {
            return false;
        }
        return id != null && id.equals(((EspaceVert) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EspaceVert{" +
            "id=" + getId() +
            ", lebelle='" + getLebelle() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            "}";
    }
}
