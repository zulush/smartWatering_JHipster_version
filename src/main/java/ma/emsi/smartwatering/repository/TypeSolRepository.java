package ma.emsi.smartwatering.repository;

import ma.emsi.smartwatering.domain.TypeSol;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TypeSol entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeSolRepository extends JpaRepository<TypeSol, Long> {}
