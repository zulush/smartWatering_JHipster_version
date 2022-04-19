package ma.emsi.smartwatering.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Arrosage.
 */
@Entity
@Table(name = "arrosage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Arrosage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private ZonedDateTime date;

    @Column(name = "litres_eau")
    private Float litresEau;

    @ManyToOne
    @JsonIgnoreProperties(value = { "notifications", "grandeurs", "plantages", "arrosages", "typeSol", "espaceVert" }, allowSetters = true)
    private Zone zone;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Arrosage id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return this.date;
    }

    public Arrosage date(ZonedDateTime date) {
        this.setDate(date);
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Float getLitresEau() {
        return this.litresEau;
    }

    public Arrosage litresEau(Float litresEau) {
        this.setLitresEau(litresEau);
        return this;
    }

    public void setLitresEau(Float litresEau) {
        this.litresEau = litresEau;
    }

    public Zone getZone() {
        return this.zone;
    }

    public void setZone(Zone zone) {
        this.zone = zone;
    }

    public Arrosage zone(Zone zone) {
        this.setZone(zone);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Arrosage)) {
            return false;
        }
        return id != null && id.equals(((Arrosage) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Arrosage{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", litresEau=" + getLitresEau() +
            "}";
    }
}
