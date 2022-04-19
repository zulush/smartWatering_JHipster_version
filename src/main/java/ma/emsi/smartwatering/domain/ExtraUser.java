package ma.emsi.smartwatering.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ExtraUser.
 */
@Entity
@Table(name = "extra_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ExtraUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @OneToOne
    @JoinColumn(unique = true)
    private User internalUser;

    @OneToMany(mappedBy = "extraUser")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zones", "extraUser" }, allowSetters = true)
    private Set<EspaceVert> espaceVerts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ExtraUser id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return this.phone;
    }

    public ExtraUser phone(String phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return this.address;
    }

    public ExtraUser address(String address) {
        this.setAddress(address);
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getInternalUser() {
        return this.internalUser;
    }

    public void setInternalUser(User user) {
        this.internalUser = user;
    }

    public ExtraUser internalUser(User user) {
        this.setInternalUser(user);
        return this;
    }

    public Set<EspaceVert> getEspaceVerts() {
        return this.espaceVerts;
    }

    public void setEspaceVerts(Set<EspaceVert> espaceVerts) {
        if (this.espaceVerts != null) {
            this.espaceVerts.forEach(i -> i.setExtraUser(null));
        }
        if (espaceVerts != null) {
            espaceVerts.forEach(i -> i.setExtraUser(this));
        }
        this.espaceVerts = espaceVerts;
    }

    public ExtraUser espaceVerts(Set<EspaceVert> espaceVerts) {
        this.setEspaceVerts(espaceVerts);
        return this;
    }

    public ExtraUser addEspaceVert(EspaceVert espaceVert) {
        this.espaceVerts.add(espaceVert);
        espaceVert.setExtraUser(this);
        return this;
    }

    public ExtraUser removeEspaceVert(EspaceVert espaceVert) {
        this.espaceVerts.remove(espaceVert);
        espaceVert.setExtraUser(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExtraUser)) {
            return false;
        }
        return id != null && id.equals(((ExtraUser) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExtraUser{" +
            "id=" + getId() +
            ", phone='" + getPhone() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
