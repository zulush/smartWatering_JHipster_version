package ma.emsi.smartwatering.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Installation.
 */
@Entity
@Table(name = "installation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Installation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date_dabut", nullable = false)
    private ZonedDateTime dateDabut;

    @Column(name = "date_fin")
    private ZonedDateTime dateFin;

    @ManyToOne
    @JsonIgnoreProperties(value = { "notifications", "grandeurs", "plantages", "arrosages", "typeSol", "espaceVert" }, allowSetters = true)
    private Zone zone;

    @ManyToOne
    @JsonIgnoreProperties(value = { "installations", "connexions" }, allowSetters = true)
    private Boitier boitier;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Installation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateDabut() {
        return this.dateDabut;
    }

    public Installation dateDabut(ZonedDateTime dateDabut) {
        this.setDateDabut(dateDabut);
        return this;
    }

    public void setDateDabut(ZonedDateTime dateDabut) {
        this.dateDabut = dateDabut;
    }

    public ZonedDateTime getDateFin() {
        return this.dateFin;
    }

    public Installation dateFin(ZonedDateTime dateFin) {
        this.setDateFin(dateFin);
        return this;
    }

    public void setDateFin(ZonedDateTime dateFin) {
        this.dateFin = dateFin;
    }

    public Zone getZone() {
        return this.zone;
    }

    public void setZone(Zone zone) {
        this.zone = zone;
    }

    public Installation zone(Zone zone) {
        this.setZone(zone);
        return this;
    }

    public Boitier getBoitier() {
        return this.boitier;
    }

    public void setBoitier(Boitier boitier) {
        this.boitier = boitier;
    }

    public Installation boitier(Boitier boitier) {
        this.setBoitier(boitier);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Installation)) {
            return false;
        }
        return id != null && id.equals(((Installation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Installation{" +
            "id=" + getId() +
            ", dateDabut='" + getDateDabut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            "}";
    }
}
