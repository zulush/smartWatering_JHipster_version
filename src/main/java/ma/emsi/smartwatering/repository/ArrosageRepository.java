package ma.emsi.smartwatering.repository;

import ma.emsi.smartwatering.domain.Arrosage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Arrosage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArrosageRepository extends JpaRepository<Arrosage, Long> {}
