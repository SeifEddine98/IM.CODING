package SERVICE;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ENTITIES.administrateur;
import ENTITIES.formateur;
import ENTITIES.gestionnaire;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private DAO.FormateurRepository formateurRepository;
    @Autowired
    private DAO.GestionnaireRepository gestionnaireRepository;
    @Autowired
    private DAO.AdministrateurRepository administrateurRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        formateur formateur = formateurRepository.findByEmail(username);
        gestionnaire gestionnaire = gestionnaireRepository.findByEmail(username);
        administrateur administrateur = administrateurRepository.findByEmail(username);

        if (formateur != null) {
	        return new org.springframework.security.core.userdetails.User(formateur.getEmail(), formateur.getMdp(), new ArrayList<>());
        } 
        else if (gestionnaire != null) {
	        return new org.springframework.security.core.userdetails.User(gestionnaire.getEmail(), gestionnaire.getMdp(), new ArrayList<>());
        }
	        else if (administrateur != null) {
	      return new org.springframework.security.core.userdetails.User(administrateur.getEmail(), administrateur.getMdp(), new ArrayList<>());
	        }
	      else {
           throw new UsernameNotFoundException("Utilisateur introuvable : " + username);
        }
    }
}
