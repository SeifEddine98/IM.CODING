package DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import ENTITIES.facture;

public interface FactureRepository extends JpaRepository<facture, Integer> {

}
