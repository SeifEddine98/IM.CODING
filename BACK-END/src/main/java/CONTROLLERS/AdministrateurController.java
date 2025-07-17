package CONTROLLERS;

import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ENTITIES.gestionnaire;
import ENTITIES.AuthRequest;
import ENTITIES.administrateur;
import ENTITIES.formateur;
import METIER.Iadministrateur;
import Util.JwtUtil;

@RestController
@RequestMapping("/Administrateur")
@CrossOrigin(origins ="http://localhost:4200")
public class AdministrateurController {
	@Autowired
	private final Iadministrateur Ia;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private AuthenticationManager authenticationManager;
	public AdministrateurController(Iadministrateur ia, JwtUtil jwtUtil,AuthenticationManager authenticationManager) {
		super();
		Ia = ia;
		this.jwtUtil = jwtUtil;
		this.authenticationManager = authenticationManager;
	}
	 @PostMapping("/authenticate")
	    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
		  if(Ia.testerAuthent(authRequest.getUserName(), authRequest.getPassword())==true)
		  {
	        try {
	            authenticationManager.authenticate(
	                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
	            );
	        } catch (Exception ex) {
	            throw new Exception("invalid username/password");
	        }
	        return jwtUtil.generateToken(authRequest.getUserName());
	    }
		  else throw new Exception("testerAuthent returned false");
	  }
	@PostMapping(value = "/addAdmin", consumes = {"multipart/form-data"})
	public ResponseEntity<administrateur> addAdmin(@RequestPart("photo_profil")  MultipartFile photo_profil,
	        @ModelAttribute administrateur administrateur) throws URISyntaxException, IOException, SQLException  {
		return Ia.addAdmin(photo_profil, administrateur);
	}
	
	@PostMapping(value = "/addGest", consumes = {"multipart/form-data"})
	public ResponseEntity<gestionnaire> addGest(@RequestPart("photo_profil")  MultipartFile photo_profil,
	        @ModelAttribute gestionnaire gestionnaire) throws URISyntaxException, IOException, SQLException  {
		return Ia.addGest(photo_profil, gestionnaire);
	}
	@GetMapping(value = "/getAllGestionnaires")
	public ArrayList<gestionnaire> getAllGestionnaires()
	{
		return Ia.getAllGestionnaires();
	}
	@GetMapping(value = "/getAllAdmins")
	public ArrayList<administrateur> getAllAdmins()
	{
		return Ia.getAllAdmins();
	}
	@GetMapping("/getGestionnaireById/{id}")
	public ResponseEntity<gestionnaire> getGestionnaireById(@PathVariable("id") Integer id) {
		return Ia.getGestionnaireById(id);
	}
	@GetMapping("/getAdminById/{id}")
	public ResponseEntity<administrateur> getAdminById(@PathVariable("id") Integer id) {
		return Ia.getAdminById(id);
	}
	@GetMapping("/getGestionnairePhotoById/{id}")
	public ResponseEntity<?> getGestionnairePhotoById(@PathVariable("id") Integer id) {
		return Ia.getGestionnairePhotoById(id);
	}
	@GetMapping("/getAdminPhotoById/{id}")
	public ResponseEntity<?> getAdminPhotoById(@PathVariable("id") Integer id) {
		return Ia.getAdminPhotoById(id);
	}
	@PutMapping("/updateGestionnaire/{id}")
	public ResponseEntity<gestionnaire> updateGestionnaire(@RequestBody gestionnaire gestionnaire, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException  {
		return Ia.updateGestionnaire(gestionnaire,id);
	}
	@PutMapping("/updateAdmin/{id}")
	public ResponseEntity<administrateur> updateAdmin(@RequestBody administrateur administrateur, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException  {
		return Ia.updateAdmin(administrateur,id);
	}
	@PutMapping(value = "/updatePhotoGestionnaire/{id}", consumes = {"multipart/form-data"})
	public ResponseEntity<?> updatePhotoGestionnaire(@RequestPart("photo_profil")  MultipartFile photo_profil, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException  {
		return Ia.updatePhotoGestionnaire(photo_profil,id);
	}
	@PutMapping(value = "/updatePhotoAdmin/{id}", consumes = {"multipart/form-data"})
	public ResponseEntity<?> updatePhotoAdmin(@RequestPart("photo_profil")  MultipartFile photo_profil, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException  {
		return Ia.updatePhotoAdmin(photo_profil,id);
	}
	@DeleteMapping("/deleteGestionnaire/{id}")
	public ResponseEntity<?> deleteGestionnaire(@PathVariable("id") Integer id) {  
	return Ia.deleteGestionnaire(id);
	}
	@DeleteMapping("/deleteAdmin/{id}")
	public ResponseEntity<?> deleteAdmin(@PathVariable("id") Integer id) {  
	return Ia.deleteAdmin(id);
	}
	@GetMapping("/getAdminByEmail")
	public administrateur getAdminByEmail(@RequestParam("email") String email) {
		return Ia.getAdminByEmail(email);
	}
	@GetMapping("/NbCongesFormateur/{formateur_id}")
	public int NbCongesFormateur(@PathVariable("formateur_id") Integer formateur_id) {
		return Ia.NbCongesFormateur(formateur_id);
	}
	@GetMapping("/NbEtudiantsParFormation/{formation_id}")
	public int NbEtudiantsParFormation(@PathVariable("formation_id") Integer formateur_id) {
		return Ia.NbEtudiantsParFormation(formateur_id);
	}
	@GetMapping("/NbTotalFactures")
	public int NbTotalFactures() {
		return Ia.NbTotalFactures();
	}
	@GetMapping("/NbTotalFacturesPayees")
	public int NbTotalFacturesPayees() {
		return Ia.NbTotalFacturesPayees();
	}
	@GetMapping("/NbTotalFacturesPartiellemntPayees")
	public int NbTotalFacturesPartiellemntPayees() {
		return Ia.NbTotalFacturesPartiellemntPayees();
	}
	@GetMapping("/NbTotalFacturesNonPayees")
	public int NbTotalFacturesNonPayees() {
		return Ia.NbTotalFacturesNonPayees();
	}
}
