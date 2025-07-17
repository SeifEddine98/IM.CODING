package DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import ENTITIES.formation;

public interface FormationRepository extends JpaRepository<formation, Integer> {

}
