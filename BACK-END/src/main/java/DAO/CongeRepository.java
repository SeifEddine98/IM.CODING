package DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ENTITIES.conge;

public interface CongeRepository extends JpaRepository<conge, Integer> {
    List<conge> findByFormateurId(Integer formateurId);
}

