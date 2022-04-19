package ma.emsi.smartwatering.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Boitier.
 */
@Entity
@Table(name = "boitier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Boitier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "reference", nullable = false)
    private Integer reference;

    @Column(name = "type")
    private String type;

    @Size(min = 64)
    @Column(name = "code")
    private String code;

    @OneToMany(mappedBy = "boitier")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zone", "boitier" }, allowSetters = true)
    private Set<Installation> installations = new HashSet<>();

    @OneToMany(mappedBy = "boitier")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "capteur", "boitier" }, allowSetters = true)
    private Set<Connecte> connexions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Boitier id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getReference() {
        return this.reference;
    }

    public Boitier reference(Integer reference) {
        this.setReference(reference);
        return this;
    }

    public void setReference(Integer reference) {
        this.reference = reference;
    }

    public String getType() {
        return this.type;
    }

    public Boitier type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCode() {
        return this.code;
    }

    public Boitier code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<Installation> getInstallations() {
        return this.installations;
    }

    public void setInstallations(Set<Installation> installations) {
        if (this.installations != null) {
            this.installations.forEach(i -> i.setBoitier(null));
        }
        if (installations != null) {
            installations.forEach(i -> i.setBoitier(this));
        }
        this.installations = installations;
    }

    public Boitier installations(Set<Installation> installations) {
        this.setInstallations(installations);
        return this;
    }

    public Boitier addInstallation(Installation installation) {
        this.installations.add(installation);
        installation.setBoitier(this);
        return this;
    }

    public Boitier removeInstallation(Installation installation) {
        this.installations.remove(installation);
        installation.setBoitier(null);
        return this;
    }

    public Set<Connecte> getConnexions() {
        return this.connexions;
    }

    public void setConnexions(Set<Connecte> connectes) {
        if (this.connexions != null) {
            this.connexions.forEach(i -> i.setBoitier(null));
        }
        if (connectes != null) {
            connectes.forEach(i -> i.setBoitier(this));
        }
        this.connexions = connectes;
    }

    public Boitier connexions(Set<Connecte> connectes) {
        this.setConnexions(connectes);
        return this;
    }

    public Boitier addConnexion(Connecte connecte) {
        this.connexions.add(connecte);
        connecte.setBoitier(this);
        return this;
    }

    public Boitier removeConnexion(Connecte connecte) {
        this.connexions.remove(connecte);
        connecte.setBoitier(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Boitier)) {
            return false;
        }
        return id != null && id.equals(((Boitier) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Boitier{" +
            "id=" + getId() +
            ", reference=" + getReference() +
            ", type='" + getType() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }
}
