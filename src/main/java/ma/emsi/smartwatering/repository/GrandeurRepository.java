package ma.emsi.smartwatering.repository;

import ma.emsi.smartwatering.domain.Grandeur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Grandeur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrandeurRepository extends JpaRepository<Grandeur, Long> {}
