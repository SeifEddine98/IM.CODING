package SERVICE;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import DAO.*;
import SERVICE.EmailService;
import Util.JwtUtil;
import ENTITIES.*;
import METIER.Igestionnaire;

@Service
@Transactional
public class IgestionnaireImpl implements Igestionnaire {
	boolean test=false;
	int x;
	formation f,f1;
	formateur ft;
	Collection<formateur> c;
	Collection<formation> c1;
	Collection<etudiant> c2;
	Collection<seance> c3;
	Collection<facture> c4;
	Collection<conge> c5;
	Collection<presence> c6;
	Collection<gestionnaire> c7;
	ArrayList<presence> p;
	ArrayList<formateur> s;
	ArrayList<seance> a;
	ArrayList<facture> b;
	ArrayList<etudiant> e;
	ArrayList<conge> o;
	ArrayList<formation> s1;
	ArrayList<String> v;
	ArrayList<formation> v2;
	ArrayList<gestionnaire> g;
	ArrayList<Integer> i;
	@Autowired
	private GestionnaireRepository GestionnaireRepository;
	@Autowired
	private FormateurRepository FormateurRepository;
	@Autowired
	private EtudiantRepository EtudiantRepository;
	@Autowired
	private Etudiant_FormationRepository Etudiant_FormationRepository;
	@Autowired
	private FormationRepository FormationRepository;
	@Autowired
	private FactureRepository FactureRepository;
	@Autowired
	private PaiementRepository PaiementRepository;
	@Autowired
	private SeanceRepository SeanceRepository;
	@Autowired
	private CongeRepository CongeRepository;
	@Autowired
	private PresenceRepository PresenceRepository;
	@Autowired
	private final EmailService EmailService;
	public IgestionnaireImpl(EmailService EmailService) {
		super();
		this.EmailService=EmailService;
	}
	@Override
	public ResponseEntity<formateur> addFormateur(@RequestPart("photo_profil")  MultipartFile photo_profil,
	        @ModelAttribute formateur formateur)
			throws URISyntaxException, IOException, SQLException {
		formateur f = FormateurRepository.save(formateur);
		 CompletableFuture.runAsync(() -> {
		            EmailService.sendCredentialsEmail(formateur.getEmail(), formateur.getMdp());
		    });
		 return ResponseEntity.created(new URI("/addFormateur" + f.getId())).body(f);
	}
	@Override
	public boolean testerAuthent(String username, String password) {
		boolean test=false;
		int i=0;
		c7= GestionnaireRepository.findAll().stream()
                .collect(Collectors.toList());
		g=new ArrayList<gestionnaire>();
		for(gestionnaire x : c7){ 
			g.add(x);
							}
		while ((test==false)&&(i<g.size()))
		{
			if((g.get(i).getEmail().equals(username))&&(g.get(i).getMdp().equals(password)))
				test=true;
			else i++;
		}
		return test;
	}

	@Override
	public ResponseEntity<etudiant_formation> addEtudiant(@RequestParam("formation_id")  Integer formation_id,
	        @RequestBody etudiant etudiant)
			throws URISyntaxException, IOException, SQLException {
		formation f=FormationRepository.findById(formation_id).get();
		etudiant_formation e_f= new etudiant_formation();
		e_f.setFormation(f);
		e_f.setEtudiant(etudiant);
		etudiant_formation e_f1 = Etudiant_FormationRepository.save(e_f);
		etudiant e =EtudiantRepository.save(etudiant);
		return ResponseEntity.created(new URI("/addEtudiant" + e_f1.getId())).body(e_f1);
	}
	@Override
	public ResponseEntity<etudiant> getEtudiantById(@PathVariable("id") Integer id) {
		Optional<etudiant> x = EtudiantRepository.findById(id);
        return x.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	@Override
	public ResponseEntity<?> deleteEtudiant(@PathVariable("id") Integer id){
		EtudiantRepository.deleteById(id);
		Etudiant_FormationRepository.deleteByEtudiantId(id);
        return ResponseEntity.ok().build();
	}
	@Override
    public ResponseEntity<etudiant> updateEtudiant(@RequestBody etudiant etudiant, @PathVariable("id") Integer id, @PathVariable("formation_id") Integer formation_id)
	{
        Optional<etudiant> eo = EtudiantRepository.findById(id);
        if (eo.isEmpty())
            return ResponseEntity.notFound().build();
        ArrayList<formation> formations = new ArrayList<formation>();
        formation f=FormationRepository.findById(formation_id).get();
        formations.add(f);
        etudiant e = eo.get();
        e.setCin(etudiant.getCin());
        e.setNom(etudiant.getNom());
        e.setPrenom(etudiant.getPrenom());
        e.setAdresse(etudiant.getAdresse());
        e.setDateNaiss(etudiant.getDateNaiss());
        e.setEmail(etudiant.getEmail());
        e.setTelephone(etudiant.getTelephone());
        e.setFormations(formations);
        etudiant result = EtudiantRepository.save(e);
        return ResponseEntity.ok().body(result);
		
	}
	@Override
	public ResponseEntity<formation> addFormation(@RequestParam("formateur_id")  Integer formateur_id,
	        @RequestBody formation formation)
			throws URISyntaxException, IOException, SQLException {
		formateur f=FormateurRepository.findById(formateur_id).get();
		formation.setFormateur(f);
		formation ft =FormationRepository.save(formation);
		return ResponseEntity.created(new URI("/addFormation" + ft.getId())).body(ft);
	}
	@Override
	public ResponseEntity<formation> getFormationById(@PathVariable("id") Integer id) {
		Optional<formation> x = FormationRepository.findById(id);
		x.get().getFormateur().getCin();
        return x.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	@Override
	public ResponseEntity<?> deleteFormation(@PathVariable("id") Integer id){
		FormationRepository.deleteById(id);
        return ResponseEntity.ok().build();
	}
	@Override
    public ResponseEntity<formation> updateFormation(@RequestBody formation formation, @PathVariable("id") Integer id, @PathVariable("formateur_id") Integer formateur_id)
	{

    	 Optional<formation> eo = FormationRepository.findById(id);
    	    if (eo.isEmpty()) {
    	        return ResponseEntity.notFound().build();
    	    }
    	    formation e = eo.get();
    	    e.setTitre(formation.getTitre());
    	    e.setDate_debut(formation.getDate_debut());
    	    e.setDate_fin(formation.getDate_fin());
    	    e.setFormateur(null);
    	    Optional<formateur> fo = FormateurRepository.findById(formateur_id);
    	    if (fo.isEmpty()) {
    	        return ResponseEntity.notFound().build();
    	    }
    	    formateur f = fo.get();
    	    e.setFormateur(f);

    	    formation result = FormationRepository.save(e);
    	    return ResponseEntity.ok().body(result);
	}
	@Override
	public ResponseEntity<seance> addSeance(@RequestParam("formation_id")  Integer formation_id,
	        @RequestBody seance seance)
			throws URISyntaxException, IOException, SQLException {
		formation f=FormationRepository.findById(formation_id).get();
		seance.setFormation(f);
		seance s =SeanceRepository.save(seance);
		return ResponseEntity.created(new URI("/addSeance" + s.getId())).body(s);
	}
	@Override
	public ResponseEntity<seance> getSeanceById(@PathVariable("id") Integer id) {
		Optional<seance> x = SeanceRepository.findById(id);
        return x.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	@Override
	public ResponseEntity<?> deleteSeance(@PathVariable("id") Integer id){
		SeanceRepository.deleteById(id);
        return ResponseEntity.ok().build();
	}
	@Override
    public ResponseEntity<seance> updateSeance(@RequestBody seance seance, @PathVariable("id") Integer id, @PathVariable("formation_id") Integer formation_id)
	{
        Optional<seance> eo = SeanceRepository.findById(id);
        if (eo.isEmpty())
            return ResponseEntity.notFound().build();
        formation f=FormationRepository.findById(formation_id).get();
        seance e = eo.get();
        e.setTitre(seance.getTitre());
        e.setNotes(seance.getNotes());
        e.setDate_debut(seance.getDate_debut());
        e.setDate_fin(seance.getDate_fin());
        e.setFormation(f);
        seance result = SeanceRepository.save(e);
        return ResponseEntity.ok().body(result);
		
	}
	@Override
	public ResponseEntity<facture> addFacture(@RequestParam("etudiant_id")  Integer etudiant_id,
	        @RequestBody facture facture)
			throws URISyntaxException, IOException, SQLException {
		etudiant e=EtudiantRepository.findById(etudiant_id).get();
		facture.setEtudiant(e);
		if ((facture.getMontant_total()==facture.getMontant_paye())&&(facture.getMontant_restant()==0))
		{
			facture.setPayee(true);
		}
		else
			facture.setPayee(false);
		facture f =FactureRepository.save(facture);
		return ResponseEntity.created(new URI("/addFacture" + f.getId())).body(f);
	}
	@Override
	public ResponseEntity<facture> getFactureById(@PathVariable("id") Integer id) {
		Optional<facture> x = FactureRepository.findById(id);
        return x.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@Override
    public ResponseEntity<facture> updateFacture(@RequestBody facture facture, @PathVariable("id") Integer id)
	{
        Optional<facture> eo = FactureRepository.findById(id);
        if (eo.isEmpty())
            return ResponseEntity.notFound().build();
        facture e = eo.get();
        e.setFormation(facture.getFormation());
        e.setMontant_total(facture.getMontant_total());
        e.setMontant_paye(facture.getMontant_paye());
        e.setMontant_restant(facture.getMontant_restant());
        if (facture.getMontant_restant()==0)
        {
        	e.setPayee(true);
        }
        else e.setPayee(false);
        facture result = FactureRepository.save(e);
        return ResponseEntity.ok().body(result);
	}
	@Override
	public ResponseEntity<paiement> addPaiement(@RequestParam("facture_id")  Integer facture_id,
	        @RequestBody paiement paiement)
			throws URISyntaxException, IOException, SQLException {
		int verifT, verifR;
		facture f=FactureRepository.findById(facture_id).get();
		verifT=f.getMontant_paye()+paiement.getMontant();
		verifR=f.getMontant_restant()-paiement.getMontant();
		if((verifT>f.getMontant_total())||(verifR<0))
			{
		    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		else if((verifT==f.getMontant_total())||(verifR==0))
		{
			f.setMontant_paye(f.getMontant_paye()+paiement.getMontant());
			f.setMontant_restant(f.getMontant_restant()-paiement.getMontant());
			f.setPayee(true);
			paiement.setFacture(f);
			paiement p =PaiementRepository.save(paiement);
			return ResponseEntity.created(new URI("/addPaiement" + p.getId())).body(p);
		}
		else
		{
			f.setMontant_paye(f.getMontant_paye()+paiement.getMontant());
			f.setMontant_restant(f.getMontant_restant()-paiement.getMontant());
			paiement.setFacture(f);
			paiement p =PaiementRepository.save(paiement);
			return ResponseEntity.created(new URI("/addPaiement" + p.getId())).body(p);
		}
		
	}
	@Override
	public ResponseEntity<conge> validerConge(@RequestParam("conge_id")  Integer conge_id, @RequestBody conge conge)
			throws URISyntaxException, IOException, SQLException {
		conge c=CongeRepository.findById(conge_id).get();
		c.setValide(conge.isValide());
		c.setReponse(conge.getReponse());
		return ResponseEntity.created(new URI("/addConge" + c.getId())).body(c);
	}
	@Override
	public ResponseEntity<conge> getCongeById(@PathVariable("id") Integer id) {
		Optional<conge> x= CongeRepository.findById(id);
        return x.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	@Override
	public ResponseEntity<?> getCongeJustById(@PathVariable("id") Integer id) {
	    Optional<conge> optionalConge = CongeRepository.findById(id);
	    if (optionalConge.isPresent()) {
	        conge c = optionalConge.get();
	        byte[] pdfBytes = c.getJustificatif();
	        ByteArrayResource pdfResource = new ByteArrayResource(pdfBytes);

	        HttpHeaders headers = new HttpHeaders();
	        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=justificatif.pdf");

	        return ResponseEntity.ok()
	                .headers(headers)
	                .contentType(MediaType.APPLICATION_PDF)
	                .contentLength(pdfBytes.length)
	                .body(pdfResource);
	    }

	    return ResponseEntity.notFound().build();
	}
	@Override
	public ResponseEntity<?> deleteConge(@PathVariable("id") Integer id){
		CongeRepository.deleteById(id);
        return ResponseEntity.ok().build();
	}
	@Override
	public ArrayList<presence> getPresenceByEtudiant(@PathVariable("etudiant_id") Integer etudiant_id) {
			p=new ArrayList<presence>();
			c6= PresenceRepository.findAll().stream()
	                .collect(Collectors.toList());
			etudiant et = EtudiantRepository.findById(etudiant_id).get();
			for(presence x : c6){ 
				if (x.getEtudiant().getId()==et.getId())
				p.add(x);
		}
			return p;
		}
	@Override
	public ArrayList<facture> getAllFactures() {
			b=new ArrayList<facture>();
			c4= FactureRepository.findAll().stream()
	                .collect(Collectors.toList());
			for(facture x : c4){ 
				b.add(x);
		}
			return b;
		}
	@Override
	public ArrayList<seance> getAllSeances() {
			a=new ArrayList<seance>();
			c3= SeanceRepository.findAll().stream()
	                .collect(Collectors.toList());
			for(seance x : c3){ 
				a.add(x);
		}
			return a;
		}	@Override
	public ResponseEntity<?> getFormateurPhotoById(@PathVariable("id") Integer id) {
		    Optional<formateur> optionalFormateur = FormateurRepository.findById(id);
		    if (optionalFormateur.isPresent()) {
		    	formateur f = optionalFormateur.get();
		        byte[] IMGBytes = f.getPhoto_profil();
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
		}@Override
	public ResponseEntity<formateur> getFormateurById(@PathVariable("id") Integer id) {
		Optional<formateur> x= FormateurRepository.findById(id);
        return x.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	@Override
	public ArrayList<formateur> getAllFormateurs() {
			s=new ArrayList<formateur>();
			c= FormateurRepository.findAll().stream()
	                .collect(Collectors.toList());
			for(formateur x : c){ 	
				s.add(x);
		}
			return s;
		}
	@Override
	 public ResponseEntity<formateur> updatFormateur(@RequestBody formateur formateur, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException{
		 formateur c=FormateurRepository.findById(id).get();
		c.setCin(formateur.getCin());
		c.setNom(formateur.getNom());
		c.setPrenom(formateur.getPrenom());
		c.setAdresse(formateur.getAdresse());
		c.setDateNaiss(formateur.getDateNaiss());
		c.setEmail(formateur.getEmail());
		c.setMdp(formateur.getMdp());
		c.setTelephone(formateur.getTelephone());
		c.setDomaine(formateur.getDomaine());
		c.setSousdomaine(formateur.getSousdomaine());
		formateur result = FormateurRepository.save(c);
		CompletableFuture.runAsync(() -> {
            EmailService.sendUpdateEmail(formateur.getEmail());
    });
		return ResponseEntity.ok().body(result);
	}
	 @Override
	public ResponseEntity<?> updatePhotoFormateur(@RequestPart("photo_profil")  MultipartFile photo_profil, @PathVariable("id") Integer id)throws URISyntaxException, IOException, SQLException{
		 formateur c=FormateurRepository.findById(id).get();
		 c.setPhoto_profil(photo_profil);
		formateur result = FormateurRepository.save(c);
		CompletableFuture.runAsync(() -> {
            EmailService.sendUpdateEmail(c.getEmail());
    });
		return ResponseEntity.ok().body(result);

	 }

	 @Override
		public ResponseEntity<?> deleteFormateur(@PathVariable("id") Integer id){
			FormateurRepository.deleteById(id);
	        return ResponseEntity.ok().build();
		}
	public ArrayList<conge> getAllConges() {
		o=new ArrayList<conge>();
		c5= CongeRepository.findAll().stream()
                .collect(Collectors.toList());
		for(conge x : c5){ 	
			o.add(x);
	}
		return o;
	}
	@Override
	public ArrayList<etudiant> getAllEtudiants() {		
			return (ArrayList<etudiant>) EtudiantRepository.findAllWithFormations();
		}
	@Override
	public ArrayList<formation> getAllFormations() {
			s1=new ArrayList<formation>();
			c1= FormationRepository.findAll().stream()
	                .collect(Collectors.toList());
			for(formation y : c1){
				f1=new formation();
				ft=new formateur();
				f1.setId(y.getId());
				f1.setTitre(y.getTitre());
				f1.setDate_debut(y.getDate_debut());
				f1.setDate_fin(y.getDate_fin());
				f1.setFormateur(y.getFormateur());
				ft.setId(y.getFormateur().getId());
				ft.setCin(y.getFormateur().getCin());
				//f1.setSeances(y.getSeances());
				s1.add(f1);
		}
			return s1;
		}
	@Override
	public ArrayList<String> getAllFormations2() {
		v=new ArrayList<String>();
		c1= FormationRepository.findAll().stream()
                .collect(Collectors.toList());
		for(formation y : c1){ 	
			v.add(y.getTitre());
	}
		return v;
	}
	@Override
	public Integer GetFormationIdByTitre(@RequestParam("titre") String titre) {
		i=new ArrayList<Integer>();
		c1= FormationRepository.findAll();
		x=0;
		test=false;
		while ((x<c1.size())&&(test==false))
		{
			 f = (formation) c1.toArray()[x];
		        if (f.getTitre().equals(titre)) {
		            i.add(f.getId());
		            test = true;
		        }
		        else
		        	x++;
		}
		return f.getId();
	}
	public gestionnaire getGestionnaireByEmail(@RequestParam("email") String email) {
		gestionnaire x= GestionnaireRepository.findByEmail(email);
        return x;
	}
}
