package DAO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ENTITIES.etudiant;

public interface EtudiantRepository extends JpaRepository<etudiant, Integer> {
	@Query("SELECT e FROM etudiant e JOIN FETCH e.formations")
   List<etudiant> findAllWithFormations();
}
