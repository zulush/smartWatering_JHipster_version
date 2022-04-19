package ma.emsi.smartwatering.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Zone.
 */
@Entity
@Table(name = "zone")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Zone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "superficie")
    private Float superficie;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @OneToMany(mappedBy = "zone")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zone" }, allowSetters = true)
    private Set<Notification> notifications = new HashSet<>();

    @OneToMany(mappedBy = "zone")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zone" }, allowSetters = true)
    private Set<Grandeur> grandeurs = new HashSet<>();

    @OneToMany(mappedBy = "zone")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "plante", "zone" }, allowSetters = true)
    private Set<Plantage> plantages = new HashSet<>();

    @OneToMany(mappedBy = "zone")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zone" }, allowSetters = true)
    private Set<Arrosage> arrosages = new HashSet<>();

    @ManyToOne
    private TypeSol typeSol;

    @ManyToOne
    @JsonIgnoreProperties(value = { "zones", "extraUser" }, allowSetters = true)
    private EspaceVert espaceVert;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Zone id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return this.libelle;
    }

    public Zone libelle(String libelle) {
        this.setLibelle(libelle);
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Float getSuperficie() {
        return this.superficie;
    }

    public Zone superficie(Float superficie) {
        this.setSuperficie(superficie);
        return this;
    }

    public void setSuperficie(Float superficie) {
        this.superficie = superficie;
    }

    public byte[] getPhoto() {
        return this.photo;
    }

    public Zone photo(byte[] photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return this.photoContentType;
    }

    public Zone photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Set<Notification> getNotifications() {
        return this.notifications;
    }

    public void setNotifications(Set<Notification> notifications) {
        if (this.notifications != null) {
            this.notifications.forEach(i -> i.setZone(null));
        }
        if (notifications != null) {
            notifications.forEach(i -> i.setZone(this));
        }
        this.notifications = notifications;
    }

    public Zone notifications(Set<Notification> notifications) {
        this.setNotifications(notifications);
        return this;
    }

    public Zone addNotification(Notification notification) {
        this.notifications.add(notification);
        notification.setZone(this);
        return this;
    }

    public Zone removeNotification(Notification notification) {
        this.notifications.remove(notification);
        notification.setZone(null);
        return this;
    }

    public Set<Grandeur> getGrandeurs() {
        return this.grandeurs;
    }

    public void setGrandeurs(Set<Grandeur> grandeurs) {
        if (this.grandeurs != null) {
            this.grandeurs.forEach(i -> i.setZone(null));
        }
        if (grandeurs != null) {
            grandeurs.forEach(i -> i.setZone(this));
        }
        this.grandeurs = grandeurs;
    }

    public Zone grandeurs(Set<Grandeur> grandeurs) {
        this.setGrandeurs(grandeurs);
        return this;
    }

    public Zone addGrandeur(Grandeur grandeur) {
        this.grandeurs.add(grandeur);
        grandeur.setZone(this);
        return this;
    }

    public Zone removeGrandeur(Grandeur grandeur) {
        this.grandeurs.remove(grandeur);
        grandeur.setZone(null);
        return this;
    }

    public Set<Plantage> getPlantages() {
        return this.plantages;
    }

    public void setPlantages(Set<Plantage> plantages) {
        if (this.plantages != null) {
            this.plantages.forEach(i -> i.setZone(null));
        }
        if (plantages != null) {
            plantages.forEach(i -> i.setZone(this));
        }
        this.plantages = plantages;
    }

    public Zone plantages(Set<Plantage> plantages) {
        this.setPlantages(plantages);
        return this;
    }

    public Zone addPlantage(Plantage plantage) {
        this.plantages.add(plantage);
        plantage.setZone(this);
        return this;
    }

    public Zone removePlantage(Plantage plantage) {
        this.plantages.remove(plantage);
        plantage.setZone(null);
        return this;
    }

    public Set<Arrosage> getArrosages() {
        return this.arrosages;
    }

    public void setArrosages(Set<Arrosage> arrosages) {
        if (this.arrosages != null) {
            this.arrosages.forEach(i -> i.setZone(null));
        }
        if (arrosages != null) {
            arrosages.forEach(i -> i.setZone(this));
        }
        this.arrosages = arrosages;
    }

    public Zone arrosages(Set<Arrosage> arrosages) {
        this.setArrosages(arrosages);
        return this;
    }

    public Zone addArrosage(Arrosage arrosage) {
        this.arrosages.add(arrosage);
        arrosage.setZone(this);
        return this;
    }

    public Zone removeArrosage(Arrosage arrosage) {
        this.arrosages.remove(arrosage);
        arrosage.setZone(null);
        return this;
    }

    public TypeSol getTypeSol() {
        return this.typeSol;
    }

    public void setTypeSol(TypeSol typeSol) {
        this.typeSol = typeSol;
    }

    public Zone typeSol(TypeSol typeSol) {
        this.setTypeSol(typeSol);
        return this;
    }

    public EspaceVert getEspaceVert() {
        return this.espaceVert;
    }

    public void setEspaceVert(EspaceVert espaceVert) {
        this.espaceVert = espaceVert;
    }

    public Zone espaceVert(EspaceVert espaceVert) {
        this.setEspaceVert(espaceVert);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Zone)) {
            return false;
        }
        return id != null && id.equals(((Zone) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Zone{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", superficie=" + getSuperficie() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            "}";
    }
}
