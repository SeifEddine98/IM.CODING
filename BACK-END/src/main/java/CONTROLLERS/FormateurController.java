package CONTROLLERS;

import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import ENTITIES.formateur;
import ENTITIES.gestionnaire;
import ENTITIES.presence;
import ENTITIES.seance;
import METIER.Iformateur;
import Util.JwtUtil;

@RestController
@RequestMapping("/Formateur")
@CrossOrigin(origins ="http://localhost:4200")
public class FormateurController {
	@Autowired
	private final Iformateur If;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private AuthenticationManager authenticationManager;
	public FormateurController(Iformateur iF, JwtUtil jwtUtil,AuthenticationManager authenticationManager) {
		super();
		If = iF;
		this.jwtUtil = jwtUtil;
		this.authenticationManager = authenticationManager;
	}
	 @PostMapping("/authenticate")
	    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
		  if(If.testerAuthent(authRequest.getUserName(), authRequest.getPassword())==true)
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
	@PostMapping(value = "/addConge", consumes = {"multipart/form-data"})
	public ResponseEntity<conge> addConge(@RequestPart("justificatif")  MultipartFile justificatif,
			@RequestParam("formateur_id")  Integer formateur_id,
			@ModelAttribute conge conge) throws URISyntaxException, IOException, SQLException  {
		return If.addConge(justificatif,formateur_id, conge);
	}
	@PutMapping(value = "/updateConge", consumes = {"multipart/form-data"})
	public ResponseEntity<conge> updateConge(@RequestPart("justificatif")  MultipartFile justificatif,
			@RequestParam("conge_id")  Integer conge_id,
			@ModelAttribute conge conge) throws URISyntaxException, IOException, SQLException  {
		return If.updateConge(justificatif,conge_id, conge);
	}
	@PostMapping(value = "/addPresence")
	public ResponseEntity<presence> addPresence(@RequestParam("seance_id")  Integer seance_id,
			@RequestParam("etudiant_id")  Integer etudiant_id,
	        @RequestBody presence presence) throws URISyntaxException, IOException, SQLException  {
		return If.addPresence(seance_id, etudiant_id, presence);
	}
	@GetMapping(value = "/getAllSeances")
	public ArrayList<seance> getAllSeances()
	{
		return If.getAllSeances();
	}
	@GetMapping(value = "/getAllEtudiants")
	public ArrayList<etudiant> getAllEtudiants()
	{
		return If.getAllEtudiants();
	}
	@GetMapping("/getFormateurByEmail")
	public formateur getFormateurByEmail(@RequestParam("email") String email) {
		return If.getFormateurByEmail(email);
	}
	@GetMapping("/getEtudiantByFormateur/{formateur_id}")
	public ArrayList<etudiant> getEtudiantByFormateur(@PathVariable("formateur_id") Integer formateur_id) {
		return If.getEtudiantByFormateur(formateur_id);
	}
	@GetMapping("/getCongeByFormateur/{formateur_id}")
	public ArrayList<conge> getCongeByFormateur(@PathVariable("formateur_id") Integer formateur_id) {
		return If.getCongeByFormateur(formateur_id);
	}
	@GetMapping("/getSeanceByFormateur/{formateur_id}")
	public ArrayList<seance> getSeanceByFormateur(@PathVariable("formateur_id") Integer formateur_id) {
		return If.getSeanceByFormateur(formateur_id);
	}
	@GetMapping("/getSeanceById/{id}")
	public ResponseEntity<?> getSeanceById(@PathVariable("id") Integer id) {
		return If.getSeanceById(id);
	}
	@PutMapping("/updateSeance/{id}")
    public ResponseEntity<seance> updateSeance(@RequestBody seance seance, @PathVariable("id") Integer id) {
	return If.updateSeance(seance, id);
	}
    
    @PostMapping("/assignerAssiduite")
    public List<presence> assignerAssiduite(@RequestBody List<presence> presences) {
	return If.assignerAssiduite(presences);
	}
}
