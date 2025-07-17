package DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import ENTITIES.administrateur;

public interface AdministrateurRepository extends JpaRepository<administrateur, Integer> {

	administrateur findByEmail(String email);

}
