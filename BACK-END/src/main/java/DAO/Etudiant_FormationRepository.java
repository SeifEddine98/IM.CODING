package DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ENTITIES.etudiant_formation;

public interface Etudiant_FormationRepository  extends JpaRepository<etudiant_formation, Integer> {
	@Modifying
	@Query("DELETE FROM etudiant_formation ef WHERE ef.etudiant.id = :etudiantId")
	void deleteByEtudiantId(@Param("etudiantId") Integer etudiantId);

}
