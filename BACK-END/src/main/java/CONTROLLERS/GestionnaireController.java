package CONTROLLERS;

import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
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

import ENTITIES.AuthRequest;
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
import METIER.Igestionnaire;
import Util.JwtUtil;

@RestController
@RequestMapping("/Gestionnaire")
@CrossOrigin(origins ="http://localhost:4200")
public class GestionnaireController {
	@Autowired
	private final Igestionnaire Ig;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private AuthenticationManager authenticationManager;
	public GestionnaireController(Igestionnaire ig, JwtUtil jwtUtil,AuthenticationManager authenticationManager) {
		super();
		Ig = ig;
		this.jwtUtil = jwtUtil;
		this.authenticationManager = authenticationManager;
	}
	  @PostMapping("/authenticate")
	    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
		  if(Ig.testerAuthent(authRequest.getUserName(), authRequest.getPassword())==true)
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
	@PostMapping(value = "/addFormateur", consumes = {"multipart/form-data"})
	public ResponseEntity<formateur> addFormateur(@RequestPart("photo_profil")  MultipartFile photo_profil,
	        @ModelAttribute formateur formateur) throws URISyntaxException, IOException, SQLException  {
		return Ig.addFormateur(photo_profil, formateur);
	}
	@PostMapping(value = "/addFormation")
	public ResponseEntity<formation> addFormation(@RequestParam("formateur_id")  Integer formateur_id,
			@RequestBody formation formation) throws URISyntaxException, IOException, SQLException  {
		return Ig.addFormation(formateur_id, formation);
	}
	@PutMapping("/updateFormation/{id}/{formateur_id}")
    public ResponseEntity<formation> updateFormation(@RequestBody formation formation, @PathVariable("id") Integer id, @PathVariable("formateur_id") Integer formateur_id) {
	return Ig.updateFormation(formation, id, formateur_id);
	}
	@DeleteMapping("/deleteFormation/{id}")
	public ResponseEntity<?> deleteFormation(@PathVariable("id") Integer id) {  
	return Ig.deleteFormation(id);
	}
	@GetMapping("/getFormationById/{id}")
	public ResponseEntity<?> getFormationById(@PathVariable("id") Integer id) {
		return Ig.getFormationById(id);
	}
	@PostMapping(value = "/addEtudiant")
	public ResponseEntity<etudiant_formation> addEtudiant(@RequestParam("formation_id")  Integer formation_id,
			@RequestBody etudiant etudiant) throws URISyntaxException, IOException, SQLException  {
		return Ig.addEtudiant(formation_id, etudiant);
	}
	@PutMapping("/updateEtudiant/{id}/{formation_id}")
    public ResponseEntity<etudiant> updateEtudiant(@RequestBody etudiant etudiant, @PathVariable("id") Integer id, @PathVariable("formation_id") Integer formation_id) {
	return Ig.updateEtudiant(etudiant, id, formation_id);
	}
	@DeleteMapping("/deleteEtudiant/{id}")
	public ResponseEntity<?> deleteEtudiant(@PathVariable("id") Integer id) {  
	return Ig.deleteEtudiant(id);
	}
	@GetMapping("/getEtudiantById/{id}")
	public ResponseEntity<?> getEtudiantById(@PathVariable("id") Integer id) {
		return Ig.getEtudiantById(id);
	}
	@PostMapping(value = "/addSeance")
	public ResponseEntity<seance> addSeance(@RequestParam("formation_id")  Integer formation_id,
			@RequestBody seance seance) throws URISyntaxException, IOException, SQLException  {
		return Ig.addSeance(formation_id, seance);
	}
	@PutMapping("/updateSeance/{id}/{formation_id}")
    public ResponseEntity<seance> updateSeance(@RequestBody seance seance, @PathVariable("id") Integer id, @PathVariable("formation_id") Integer formation_id) {
	return Ig.updateSeance(seance, id, formation_id);
	}
	@DeleteMapping("/deleteSeance/{id}")
	public ResponseEntity<?> deleteSeance(@PathVariable("id") Integer id) {  
	return Ig.deleteSeance(id);
	}
	@GetMapping("/getSeanceById/{id}")
	public ResponseEntity<?> getSeanceById(@PathVariable("id") Integer id) {
		return Ig.getSeanceById(id);
	}
	@PostMapping(value = "/addFacture")
	public ResponseEntity<facture> addFacture(@RequestParam("etudiant_id")  Integer etudiant_id,
			@RequestBody facture facture) throws URISyntaxException, IOException, SQLException  {
		return Ig.addFacture(etudiant_id, facture);
	}
	@PutMapping("/updateFacture/{id}")
    public ResponseEntity<facture> updateFacture(@RequestBody facture facture, @PathVariable("id") Integer id) {
	return Ig.updateFacture(facture, id);
	}
	@GetMapping("/getFactureById/{id}")
	public ResponseEntity<?> getFactureById(@PathVariable("id") Integer id) {
		return Ig.getFactureById(id);
	}
	@PostMapping(value = "/addPaiement")
	public ResponseEntity<paiement> addPaiement(@RequestParam("facture_id")  Integer facture_id,
			@RequestBody paiement paiement) throws URISyntaxException, IOException, SQLException  {
		return Ig.addPaiement(facture_id, paiement);
	}
	@PutMapping(value = "/validerConge")
	public ResponseEntity<conge> validerConge(@RequestParam("conge_id")  Integer conge_id, @RequestBody conge conge)
			throws URISyntaxException, IOException, SQLException  {
		return Ig.validerConge(conge_id, conge);
	}
	@DeleteMapping("/deleteConge/{id}")
	public ResponseEntity<?> deleteConge(@PathVariable("id") Integer id) {  
	return Ig.deleteConge(id);
	}
	@GetMapping("/getCongeJustById/{id}")
	public ResponseEntity<?> getCongeJustById(@PathVariable("id") Integer id) {
		return Ig.getCongeJustById(id);
	}
	@GetMapping("/getCongeById/{id}")
	public ResponseEntity<conge> getCongeById(@PathVariable("id") Integer id) {
		return Ig.getCongeById(id);
	}
	@GetMapping("/getPresenceByEtudiant/{etudiant_id}")
	public ArrayList<presence> getPresenceByEtudiant(@PathVariable("etudiant_id") Integer etudiant_id) {
		return Ig.getPresenceByEtudiant(etudiant_id);
	}
	@GetMapping(value = "/getAllConges")
	public ArrayList<conge> getAllConges()
	{
		return Ig.getAllConges();
	}
	@GetMapping(value = "/getAllSeances")
	public ArrayList<seance> getAllSeances()
	{
		return Ig.getAllSeances();
	}
	@GetMapping(value = "/getAllFormateurs")
	public ArrayList<formateur> getAllFormateurs()
	{
		return Ig.getAllFormateurs();
	}
	@GetMapping("/getFormateurPhotoById/{id}")
	public ResponseEntity<?> getFormateurPhotoById(@PathVariable("id") Integer id) {
		return Ig.getFormateurPhotoById(id);
	}
	@PutMapping("/updateFormateur/{id}")
	public ResponseEntity<formateur> updatFormateur(@RequestBody formateur formateur, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException  {
		return Ig.updatFormateur(formateur,id);
	}
	@PutMapping(value = "/updatePhotoFormateur/{id}", consumes = {"multipart/form-data"})
	public ResponseEntity<?> updatePhotoFormateur(@RequestPart("photo_profil")  MultipartFile photo_profil, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException  {
		return Ig.updatePhotoFormateur(photo_profil,id);
	}
	@GetMapping("/getFormateurById/{id}")
	public ResponseEntity<formateur> getFormateurById(@PathVariable("id") Integer id) {
		return Ig.getFormateurById(id);
	}
	@DeleteMapping("/deleteFormateur/{id}")
	public ResponseEntity<?> deleteFormateur(@PathVariable("id") Integer id) {  
	return Ig.deleteFormateur(id);
	}
	@GetMapping(value = "/getAllEtudiants")
	public List<etudiant> getAllEtudiants()
	{
		return Ig.getAllEtudiants();
	}
	@GetMapping(value = "/getAllFactures")
	public List<facture> getAllFactures()
	{
		return Ig.getAllFactures();
	}
	@GetMapping(value = "/getAllFormations")
	public ArrayList<formation> getAllFormations()
	{
		return Ig.getAllFormations();
	}
	@GetMapping(value = "/getAllFormations2")
	public ArrayList<String> getAllFormations2()
	{
		return Ig.getAllFormations2();
	}
	@GetMapping("/GetFormationIdByTitre")
	public Integer GetFormationIdByTitre(@RequestParam("titre") String titre) {
		return Ig.GetFormationIdByTitre(titre);
	}
	@GetMapping("/getGestionnaireByEmail")
	public gestionnaire getGestionnaireByEmail(@RequestParam("email") String email) {
		return Ig.getGestionnaireByEmail(email);
	}
	
}
