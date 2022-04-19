package ma.emsi.smartwatering.repository;

import ma.emsi.smartwatering.domain.Connecte;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Connecte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConnecteRepository extends JpaRepository<Connecte, Long> {}
