package ma.emsi.smartwatering.repository;

import ma.emsi.smartwatering.domain.TypePlante;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TypePlante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypePlanteRepository extends JpaRepository<TypePlante, Long> {}
