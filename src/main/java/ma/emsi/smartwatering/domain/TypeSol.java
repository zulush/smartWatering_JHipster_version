package ma.emsi.smartwatering.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TypeSol.
 */
@Entity
@Table(name = "type_sol")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TypeSol implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "lebelle", nullable = false)
    private String lebelle;

    @Column(name = "description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TypeSol id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLebelle() {
        return this.lebelle;
    }

    public TypeSol lebelle(String lebelle) {
        this.setLebelle(lebelle);
        return this;
    }

    public void setLebelle(String lebelle) {
        this.lebelle = lebelle;
    }

    public String getDescription() {
        return this.description;
    }

    public TypeSol description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypeSol)) {
            return false;
        }
        return id != null && id.equals(((TypeSol) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TypeSol{" +
            "id=" + getId() +
            ", lebelle='" + getLebelle() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
