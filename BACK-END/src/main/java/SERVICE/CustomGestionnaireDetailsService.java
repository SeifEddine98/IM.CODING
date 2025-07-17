package SERVICE;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ENTITIES.gestionnaire;
@Service
@Transactional
public class CustomGestionnaireDetailsService implements UserDetailsService {
	 @Autowired
	    private DAO.GestionnaireRepository GestionnaireRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		gestionnaire gestionnaire = GestionnaireRepository.findByEmail(username);
	        return new org.springframework.security.core.userdetails.User(gestionnaire.getEmail(), gestionnaire.getMdp(), new ArrayList<>());
	}

}