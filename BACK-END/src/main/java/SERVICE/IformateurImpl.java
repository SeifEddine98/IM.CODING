package SERVICE;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import DAO.*;
import ENTITIES.conge;
import ENTITIES.etudiant;
import ENTITIES.formateur;
import ENTITIES.formation;
import ENTITIES.gestionnaire;
import ENTITIES.presence;
import ENTITIES.seance;
import METIER.Iformateur;

@Service
@Transactional
public class IformateurImpl implements Iformateur {
	Collection<seance> c;
	Collection<conge> c1;
	Collection<etudiant> c2;
	Collection<formateur> c7;
	ArrayList<seance> s,z;
	ArrayList<formateur> g;
	ArrayList<conge> p;
	ArrayList<etudiant> e,n;
	@Autowired
	private FormationRepository FormationRepository;
	@Autowired
	private FormateurRepository FormateurRepository;
	@Autowired
	private CongeRepository CongeRepository;
	@Autowired
	private SeanceRepository SeanceRepository;
	@Autowired
	private EtudiantRepository EtudiantRepository;
	@Autowired
	private PresenceRepository PresenceRepository;

	
	@Override
	public boolean testerAuthent(String username, String password) {
		boolean test=false;
		int i=0;
		c7= FormateurRepository.findAll().stream()
                .collect(Collectors.toList());
		g=new ArrayList<formateur>();
		for(formateur x : c7){ 
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
	public ResponseEntity<conge> addConge(@RequestPart("justificatif")  MultipartFile justificatif,
			@RequestParam("formateur_id")  Integer formateur_id,
			@ModelAttribute conge conge) throws URISyntaxException, IOException, SQLException {
		formateur f=FormateurRepository.findById(formateur_id).get();
		conge.setFormateur(f);
		conge cg =CongeRepository.save(conge);
		return ResponseEntity.created(new URI("/addConge" + cg.getId())).body(cg);
	}
	@Override
	public ResponseEntity<conge> updateConge(@RequestPart("justificatif")  MultipartFile justificatif,
			@RequestParam("conge_id")  Integer conge_id,
			@ModelAttribute conge conge) throws URISyntaxException, IOException, SQLException{
		conge c=CongeRepository.findById(conge_id).get();
		c.setNom(conge.getNom());
		c.setPrenom(conge.getPrenom());
		c.setCause(conge.getCause());
		c.setDate_debut(conge.getDate_debut());
		c.setDate_fin(conge.getDate_fin());
		c.setJustificatif(justificatif);
		conge result = CongeRepository.save(c);
        return ResponseEntity.ok().body(result);
	}
	@Override
	public ResponseEntity<presence> addPresence(@RequestParam("seance_id")  Integer seance_id,
			@RequestParam("etudiant_id")  Integer etudiant_id,
	        @RequestBody presence presence) throws URISyntaxException, IOException, SQLException {
		seance s=SeanceRepository.findById(seance_id).get();
		etudiant e=EtudiantRepository.findById(etudiant_id).get();
		presence.setSeance(s);
		presence.setEtudiant(e);
		presence p =PresenceRepository.save(presence);
		return ResponseEntity.created(new URI("/addPresence" + p.getId())).body(p);
	}

	@Override
	public ArrayList<seance> getAllSeances() {
		s=new ArrayList<seance>();
		c= SeanceRepository.findAll().stream()
                .collect(Collectors.toList());
		for(seance x : c){ 	
			s.add(x);
	}
		return s;
	}
	@Override
	public ArrayList<etudiant> getAllEtudiants() {
			e=new ArrayList<etudiant>();
			c2= EtudiantRepository.findAll().stream()
	                .collect(Collectors.toList());
			for(etudiant x : c2){ 	
				e.add(x);
		}
			return e;
		}
	@Override
	public formateur getFormateurByEmail(@RequestParam("email") String email) {
			formateur x= FormateurRepository.findByEmail(email);
	        return x;
		}
	@Override
	public ArrayList<etudiant> getEtudiantByFormateur(@PathVariable("formateur_id") Integer formateur_id)
		{
			n=new ArrayList<etudiant>();
			c2= EtudiantRepository.findAll().stream()
	                .collect(Collectors.toList());
			formateur e = FormateurRepository.findById(formateur_id).get();
			for(etudiant x : c2){ 
				for (int i=0; i<x.getFormations().size(); i++) {
					if (x.getFormations().get(i).getFormateur().getId()==e.getId())
						n.add(x);
					}
				}
			return n;
		}
		@Override
		public ArrayList<conge> getCongeByFormateur(@PathVariable("formateur_id") Integer formateur_id)
			{
				p=new ArrayList<conge>();
				c1= CongeRepository.findAll().stream()
		                .collect(Collectors.toList());
				formateur e = FormateurRepository.findById(formateur_id).get();
				for(conge x : c1){ 
					if (x.getFormateur().getId()==e.getId())
					p.add(x);
			}
				return p;
			}
		@Override
		public ArrayList<seance> getSeanceByFormateur(@PathVariable("formateur_id") Integer formateur_id)
			{
				z=new ArrayList<seance>();
				c= SeanceRepository.findAll().stream()
		                .collect(Collectors.toList());
				formateur e = FormateurRepository.findById(formateur_id).get();
				for(seance x : c){ 
					if (x.getFormation().getFormateur().getId()==e.getId())
					z.add(x);
			}
				return z;
			}
		@Override
		public ResponseEntity<seance> getSeanceById(@PathVariable("id") Integer id) {
			Optional<seance> x = SeanceRepository.findById(id);
	        return x.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
		}
		@Override
	    public ResponseEntity<seance> updateSeance(@RequestBody seance seance, @PathVariable("id") Integer id)
		{
	        Optional<seance> eo = SeanceRepository.findById(id);
	        if (eo.isEmpty())
	            return ResponseEntity.notFound().build();
	        seance e = eo.get();
	        e.setNotes(seance.getNotes());
	        seance result = SeanceRepository.save(e);
	        return ResponseEntity.ok().body(result);
			
		}
		@Override
		public List<presence> assignerAssiduite(List<presence> presences) {
			return PresenceRepository.saveAll(presences);
		}
}
