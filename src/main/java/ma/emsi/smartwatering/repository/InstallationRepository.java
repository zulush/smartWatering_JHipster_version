package ma.emsi.smartwatering.repository;

import ma.emsi.smartwatering.domain.Installation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Installation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstallationRepository extends JpaRepository<Installation, Long> {}
