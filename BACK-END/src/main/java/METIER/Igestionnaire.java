package METIER;

import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.Part;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import ENTITIES.conge;
import ENTITIES.etudiant;
import ENTITIES.etudiant_formation;
import ENTITIES.facture;
import ENTITIES.formateur;
import ENTITIES.formation;
import ENTITIES.gestionnaire;
import ENTITIES.paiement;
import ENTITIES.presence;
import ENTITIES.seance;

public interface Igestionnaire {
	public ResponseEntity<formateur> addFormateur(@RequestPart("photo_profil")  MultipartFile photo_profil,
	        @ModelAttribute formateur formateur) throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<formation> addFormation(@RequestParam("formateur_id")  Integer formateur_id,
	        @RequestBody formation formation) throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<formation> getFormationById(@PathVariable("id") Integer id);
	public ResponseEntity<?> deleteFormation(@PathVariable("id") Integer id);
    public ResponseEntity<formation> updateFormation(@RequestBody formation formation, @PathVariable("id") Integer id, @PathVariable("formateur_id") Integer formateur_id);
	public ResponseEntity<seance> addSeance(@RequestParam("formation_id")  Integer formation_id,
	        @RequestBody seance seance) throws URISyntaxException, IOException, SQLException;
	public ArrayList<seance> getAllSeances();
	public ResponseEntity<seance> getSeanceById(@PathVariable("id") Integer id);
	public ResponseEntity<?> deleteSeance(@PathVariable("id") Integer id);
    public ResponseEntity<seance> updateSeance(@RequestBody seance seance, @PathVariable("id") Integer id, @PathVariable("formation_id") Integer formation_id);
	public ResponseEntity<facture> addFacture(@RequestParam("etudiant_id")  Integer etudiant_id,
	        @RequestBody facture facture) throws URISyntaxException, IOException, SQLException;
	public ArrayList<facture> getAllFactures();
	public ResponseEntity<facture> getFactureById(@PathVariable("id") Integer id);
    public ResponseEntity<facture> updateFacture(@RequestBody facture facture, @PathVariable("id") Integer id);
	public ResponseEntity<paiement> addPaiement(@RequestParam("facture_id")  Integer facture_id,
	        @RequestBody paiement paiement) throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<etudiant_formation> addEtudiant(@RequestParam("formation_id")  Integer formation_id,
			@RequestBody etudiant etudiant) throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<etudiant> getEtudiantById(@PathVariable("id") Integer id);
	public ArrayList<etudiant> getAllEtudiants();
	public ResponseEntity<?> deleteEtudiant(@PathVariable("id") Integer id);
    public ResponseEntity<etudiant> updateEtudiant(@RequestBody etudiant etudiant, @PathVariable("id") Integer id, @PathVariable("formation_id") Integer formation_id);
	public ResponseEntity<conge> validerConge(@RequestParam("conge_id")  Integer conge_id, @RequestBody conge conge)
			throws URISyntaxException, IOException, SQLException;
	public ArrayList<conge> getAllConges();
	public ArrayList<presence> getPresenceByEtudiant(@PathVariable("etudiant_id") Integer etudiant_id);
	public ResponseEntity<?> getCongeJustById(@PathVariable("id") Integer id);
	public ResponseEntity<conge> getCongeById(@PathVariable("id") Integer id);
	public ResponseEntity<?> deleteConge(@PathVariable("id") Integer id);
	public ArrayList<formateur> getAllFormateurs();
	public ResponseEntity<?> getFormateurPhotoById(@PathVariable("id") Integer id);
	public ResponseEntity<formateur> updatFormateur(@RequestBody formateur formateur, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<?> updatePhotoFormateur(@RequestPart("photo_profil")  MultipartFile photo_profil, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<?> deleteFormateur(@PathVariable("id") Integer id);
	public ResponseEntity<formateur> getFormateurById(@PathVariable("id") Integer id);
	public ArrayList<formation> getAllFormations();
	public ArrayList<String> getAllFormations2();
	public Integer GetFormationIdByTitre(@RequestParam("titre") String titre);
	public gestionnaire getGestionnaireByEmail(@RequestParam("email") String email);
	public boolean testerAuthent(String username, String password);

}
