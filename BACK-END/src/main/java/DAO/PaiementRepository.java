package DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import ENTITIES.paiement;

public interface PaiementRepository extends JpaRepository<paiement, Integer> {

}
