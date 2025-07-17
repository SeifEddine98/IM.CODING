package DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import ENTITIES.presence;

public interface PresenceRepository extends JpaRepository<presence, Integer> {

}
