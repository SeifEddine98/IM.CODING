package METIER;

import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import ENTITIES.conge;
import ENTITIES.etudiant;
import ENTITIES.formateur;
import ENTITIES.gestionnaire;
import ENTITIES.presence;
import ENTITIES.seance;

public interface Iformateur {
	public ResponseEntity<conge> addConge(@RequestPart("justificatif")  MultipartFile justificatif,
			@RequestParam("formateur_id")  Integer formateur_id,
			@ModelAttribute conge conge) throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<presence> addPresence(@RequestParam("seance_id")  Integer seance_id,
			@RequestParam("etudiant_id")  Integer etudiant_id,
	        @RequestBody presence presence) throws URISyntaxException, IOException, SQLException;
	public List<presence> assignerAssiduite(List<presence> presences);
	 public ResponseEntity<conge> updateConge(@RequestPart("justificatif")  MultipartFile justificatif,
				@RequestParam("formateur_id")  Integer formateur_id,
				@ModelAttribute conge conge)throws URISyntaxException, IOException, SQLException;
	public ArrayList<seance> getAllSeances();
	public ArrayList<etudiant> getAllEtudiants();
	public formateur getFormateurByEmail(@RequestParam("email") String email);
	public ArrayList<conge> getCongeByFormateur(@PathVariable("formateur_id") Integer formateur_id);
	public ArrayList<seance> getSeanceByFormateur(@PathVariable("formateur_id") Integer formateur_id);
	public ArrayList<etudiant> getEtudiantByFormateur(@PathVariable("formateur_id") Integer formateur_id);
	public ResponseEntity<seance> getSeanceById(@PathVariable("id") Integer id);
    public ResponseEntity<seance> updateSeance(@RequestBody seance seance, @PathVariable("id") Integer id);
	public boolean testerAuthent(String username, String password);


}
