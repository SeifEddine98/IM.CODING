package DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import ENTITIES.formateur;

public interface FormateurRepository  extends JpaRepository<formateur, Integer>{

	formateur findByEmail(String email);

}
