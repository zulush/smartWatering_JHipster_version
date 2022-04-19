package ma.emsi.smartwatering.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Plantage.
 */
@Entity
@Table(name = "plantage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Plantage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private ZonedDateTime date;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private Integer nombre;

    @ManyToOne
    @JsonIgnoreProperties(value = { "type" }, allowSetters = true)
    private Plante plante;

    @ManyToOne
    @JsonIgnoreProperties(value = { "notifications", "grandeurs", "plantages", "arrosages", "typeSol", "espaceVert" }, allowSetters = true)
    private Zone zone;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Plantage id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return this.date;
    }

    public Plantage date(ZonedDateTime date) {
        this.setDate(date);
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Integer getNombre() {
        return this.nombre;
    }

    public Plantage nombre(Integer nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(Integer nombre) {
        this.nombre = nombre;
    }

    public Plante getPlante() {
        return this.plante;
    }

    public void setPlante(Plante plante) {
        this.plante = plante;
    }

    public Plantage plante(Plante plante) {
        this.setPlante(plante);
        return this;
    }

    public Zone getZone() {
        return this.zone;
    }

    public void setZone(Zone zone) {
        this.zone = zone;
    }

    public Plantage zone(Zone zone) {
        this.setZone(zone);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Plantage)) {
            return false;
        }
        return id != null && id.equals(((Plantage) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Plantage{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", nombre=" + getNombre() +
            "}";
    }
}
