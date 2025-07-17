package DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import ENTITIES.gestionnaire;

public interface GestionnaireRepository extends JpaRepository<gestionnaire, Integer> {

	gestionnaire findByEmail(String email);

}
