package METIER;

import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import ENTITIES.administrateur;
import ENTITIES.formateur;
import ENTITIES.gestionnaire;

public interface Iadministrateur {
	public ResponseEntity<administrateur> addAdmin(@RequestPart("photo_profil")  MultipartFile photo_profil,
	        @ModelAttribute administrateur administrateur) throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<gestionnaire> addGest(@RequestPart("photo_profil")  MultipartFile photo_profil,
	        @ModelAttribute gestionnaire gestionnaire) throws URISyntaxException, IOException, SQLException;
	public ArrayList<gestionnaire> getAllGestionnaires();
	public ResponseEntity<gestionnaire> getGestionnaireById(@PathVariable("id") Integer id);
	public ResponseEntity<?> getGestionnairePhotoById(@PathVariable("id") Integer id);
	public ResponseEntity<gestionnaire> updateGestionnaire(@RequestBody gestionnaire gestionnaire, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<?> updatePhotoGestionnaire(@RequestPart("photo_profil")  MultipartFile photo_profil, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<?> deleteGestionnaire(@PathVariable("id") Integer id);
	public ArrayList<administrateur> getAllAdmins();
	public ResponseEntity<administrateur> getAdminById(@PathVariable("id") Integer id);
	public ResponseEntity<?> getAdminPhotoById(@PathVariable("id") Integer id);
	public ResponseEntity<administrateur> updateAdmin(@RequestBody administrateur administrateur, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<?> updatePhotoAdmin(@RequestPart("photo_profil")  MultipartFile photo_profil, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException;
	public ResponseEntity<?> deleteAdmin(@PathVariable("id") Integer id);
	public administrateur getAdminByEmail(@RequestParam("email") String email);
	public boolean testerAuthent(String username, String password);
	public int NbCongesFormateur(@PathVariable("formateur_id") Integer formateur_id);
	public int NbEtudiantsParFormation(@PathVariable("formation_id") Integer formation_id);
	public int NbTotalFactures();
	public int NbTotalFacturesPayees();
	public int NbTotalFacturesPartiellemntPayees();
	public int NbTotalFacturesNonPayees();

}
