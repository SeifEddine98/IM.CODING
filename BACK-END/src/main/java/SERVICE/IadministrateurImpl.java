package SERVICE;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import DAO.AdministrateurRepository;
import DAO.FormateurRepository;
import DAO.GestionnaireRepository;
import DAO.Etudiant_FormationRepository;
import DAO.CongeRepository;
import DAO.FactureRepository;

import ENTITIES.administrateur;
import ENTITIES.conge;
import ENTITIES.formateur;
import ENTITIES.gestionnaire;
import ENTITIES.presence;
import METIER.Iadministrateur;

@Service
@Transactional
public class IadministrateurImpl implements Iadministrateur {
	Collection<gestionnaire> cg;
	ArrayList<gestionnaire> g;
	Collection<administrateur> ca,c7;
	ArrayList<administrateur> a,gs;
	Collection<conge> co;
	ArrayList<conge> o;
	@Autowired
	private AdministrateurRepository AdministrateurRepository;
	@Autowired
	private GestionnaireRepository GestionnaireRepository;
	@Autowired
	private FormateurRepository FormateurRepository;
	@Autowired
	private Etudiant_FormationRepository Etudiant_FormationRepository;
	@Autowired
	private CongeRepository CongeRepository;
	@Autowired
	private FactureRepository FactureRepository;
	@Autowired
	private final EmailService EmailService;
	public IadministrateurImpl(EmailService EmailService) {
		super();
		this.EmailService=EmailService;
	}

	@Override
	public boolean testerAuthent(String username, String password) {
		boolean test=false;
		int i=0;
		c7= AdministrateurRepository.findAll().stream()
                .collect(Collectors.toList());
		gs=new ArrayList<administrateur>();
		for(administrateur x : c7){ 
			gs.add(x);
							}
		while ((test==false)&&(i<gs.size()))
		{
			if((gs.get(i).getEmail().equals(username))&&(gs.get(i).getMdp().equals(password)))
				test=true;
			else i++;
		}
		return test;
	}
	@Override
	public ResponseEntity<administrateur> addAdmin(@RequestPart("photo_profil")  MultipartFile photo_profil,
	        @ModelAttribute administrateur administrateur)
			throws URISyntaxException, IOException, SQLException {
		administrateur a = AdministrateurRepository.save(administrateur);
		CompletableFuture.runAsync(() -> {
            EmailService.sendCredentialsEmail(administrateur.getEmail(), administrateur.getMdp());
    });
		return ResponseEntity.created(new URI("/addAdmin" + a.getId())).body(a);
	}

	@Override
	public ResponseEntity<gestionnaire> addGest(@RequestPart("photo_profil")  MultipartFile photo_profil,
	        @ModelAttribute gestionnaire gestionnaire)
			throws URISyntaxException, IOException, SQLException {
		gestionnaire g = GestionnaireRepository.save(gestionnaire);
		CompletableFuture.runAsync(() -> {
            EmailService.sendCredentialsEmail(gestionnaire.getEmail(), gestionnaire.getMdp());
    });	    return ResponseEntity.created(new URI("/addGest" + g.getId())).body(g);
	}
	@Override
	public ArrayList<gestionnaire> getAllGestionnaires() {
			g=new ArrayList<gestionnaire>();
			cg= GestionnaireRepository.findAll().stream()
	                .collect(Collectors.toList());
			for(gestionnaire x : cg){ 	
				g.add(x);
		}
			return g;
		}
	@Override
	public ArrayList<administrateur> getAllAdmins() {
			a=new ArrayList<administrateur>();
			ca= AdministrateurRepository.findAll().stream()
	                .collect(Collectors.toList());
			for(administrateur x : ca){ 	
				a.add(x);
		}
			return a;
		}
	@Override
	public ResponseEntity<gestionnaire> getGestionnaireById(@PathVariable("id") Integer id) {
		Optional<gestionnaire> x= GestionnaireRepository.findById(id);
        return x.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	@Override
	public ResponseEntity<administrateur> getAdminById(@PathVariable("id") Integer id) {
		Optional<administrateur> x= AdministrateurRepository.findById(id);
        return x.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	@Override
	public ResponseEntity<?> getGestionnairePhotoById(@PathVariable("id") Integer id) {
		    Optional<gestionnaire> optionalGestionnaire = GestionnaireRepository.findById(id);
		    if (optionalGestionnaire.isPresent()) {
		    	gestionnaire g = optionalGestionnaire.get();
		        byte[] IMGBytes = g.getPhoto_profil();
		        ByteArrayResource imgResource = new ByteArrayResource(IMGBytes);

		        HttpHeaders headers = new HttpHeaders();
		        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=photo_profile.png");

		        return ResponseEntity.ok()
		                .headers(headers)
		                .contentType(MediaType.IMAGE_PNG)
		                .contentLength(IMGBytes.length)
		                .body(imgResource);
		    }

		    return ResponseEntity.notFound().build();
		}
	public ResponseEntity<?> getAdminPhotoById(@PathVariable("id") Integer id) {
	    Optional<administrateur> optionalAdministrateur = AdministrateurRepository.findById(id);
	    if (optionalAdministrateur.isPresent()) {
	    	administrateur a = optionalAdministrateur.get();
	        byte[] IMGBytes = a.getPhoto_profil();
	        ByteArrayResource imgResource = new ByteArrayResource(IMGBytes);

	        HttpHeaders headers = new HttpHeaders();
	        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=photo_profile.png");

	        return ResponseEntity.ok()
	                .headers(headers)
	                .contentType(MediaType.IMAGE_PNG)
	                .contentLength(IMGBytes.length)
	                .body(imgResource);
	    }

	    return ResponseEntity.notFound().build();
	}
	@Override
	 public ResponseEntity<gestionnaire> updateGestionnaire(@RequestBody gestionnaire gestionnaire, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException{
		 gestionnaire g=GestionnaireRepository.findById(id).get();
		g.setCin(gestionnaire.getCin());
		g.setNom(gestionnaire.getNom());
		g.setPrenom(gestionnaire.getPrenom());
		g.setAdresse(gestionnaire.getAdresse());
		g.setDateNaiss(gestionnaire.getDateNaiss());
		g.setEmail(gestionnaire.getEmail());
		g.setMdp(gestionnaire.getMdp());
		g.setTelephone(gestionnaire.getTelephone());
		gestionnaire result = GestionnaireRepository.save(g);
		CompletableFuture.runAsync(() -> {
            EmailService.sendUpdateEmail(gestionnaire.getEmail());
    });       return ResponseEntity.ok().body(result);
	}
	 @Override
	 public ResponseEntity<administrateur> updateAdmin(@RequestBody administrateur administrateur, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException{
		 administrateur a=AdministrateurRepository.findById(id).get();
		a.setCin(administrateur.getCin());
		a.setNom(administrateur.getNom());
		a.setPrenom(administrateur.getPrenom());
		a.setAdresse(administrateur.getAdresse());
		a.setDateNaiss(administrateur.getDateNaiss());
		a.setEmail(administrateur.getEmail());
		a.setMdp(administrateur.getMdp());
		a.setTelephone(administrateur.getTelephone());
		administrateur result = AdministrateurRepository.save(a);
		CompletableFuture.runAsync(() -> {
            EmailService.sendUpdateEmail(administrateur.getEmail());
    });       return ResponseEntity.ok().body(result);
	}
	 @Override
		public ResponseEntity<?> updatePhotoGestionnaire(@RequestPart("photo_profil")  MultipartFile photo_profil, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException{
			 gestionnaire g=GestionnaireRepository.findById(id).get();
			 g.setPhoto_profil(photo_profil);
			 gestionnaire result = GestionnaireRepository.save(g);
			 CompletableFuture.runAsync(() -> {
		            EmailService.sendUpdateEmail(g.getEmail());
		    });	        return ResponseEntity.ok().body(result);
		 }
	 @Override
		public ResponseEntity<?> updatePhotoAdmin(@RequestPart("photo_profil")  MultipartFile photo_profil, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException{
			 administrateur a=AdministrateurRepository.findById(id).get();
			 a.setPhoto_profil(photo_profil);
			 administrateur result = AdministrateurRepository.save(a);
			 CompletableFuture.runAsync(() -> {
		            EmailService.sendUpdateEmail(a.getEmail());
		    });	 
			 return ResponseEntity.ok().body(result);
		 }
	 @Override
		public ResponseEntity<?> deleteGestionnaire(@PathVariable("id") Integer id){
		 GestionnaireRepository.deleteById(id);
	        return ResponseEntity.ok().build();
		}
	 @Override
		public ResponseEntity<?> deleteAdmin(@PathVariable("id") Integer id){
		 AdministrateurRepository.deleteById(id);
	        return ResponseEntity.ok().build();
		}
	 @Override
	 public administrateur getAdminByEmail(@RequestParam("email") String email) {
		 administrateur x= AdministrateurRepository.findByEmail(email);
	        return x;
		}
	 @Override
		public int NbCongesFormateur(@PathVariable("formateur_id") Integer formateur_id) {
		 return CongeRepository.findAll().stream().
	                filter(x -> x.getFormateur().getId()==formateur_id)
	                .collect(Collectors.toList()).size();
	 }
	 @Override
		public int NbEtudiantsParFormation(@PathVariable("formation_id") Integer formation_id) {
		 return Etudiant_FormationRepository.findAll().stream().
	                filter(x -> x.getFormation().getId()==formation_id)
	                .collect(Collectors.toList()).size();
	 }
	 @Override
	 public int NbTotalFactures() {
		 return FactureRepository.findAll().stream()
				 .collect(Collectors.toList()).size();
	 }
	 @Override
	 public int NbTotalFacturesPayees() {
		 return FactureRepository.findAll().stream().
				 filter(x -> x.isPayee()==true)
				 .collect(Collectors.toList()).size();
	 }
	 @Override
	 public int NbTotalFacturesPartiellemntPayees() {
		 return FactureRepository.findAll().stream().
				 filter(x -> x.getMontant_restant()<x.getMontant_total()).
				 filter(x -> x.getMontant_restant()>0)
				 .collect(Collectors.toList()).size();
	 }
	 @Override
	 public int NbTotalFacturesNonPayees() {
		 return FactureRepository.findAll().stream().
				 filter(x -> x.isPayee()==false).
				 filter(x -> x.getMontant_restant()==x.getMontant_total())
				 .collect(Collectors.toList()).size();
	 }
	 
	 
}
