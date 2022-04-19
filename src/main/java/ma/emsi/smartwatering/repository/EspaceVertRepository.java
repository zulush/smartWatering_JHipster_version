package ma.emsi.smartwatering.repository;

import ma.emsi.smartwatering.domain.EspaceVert;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EspaceVert entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspaceVertRepository extends JpaRepository<EspaceVert, Long> {}
