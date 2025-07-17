package SERVICE;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ENTITIES.administrateur;
@Service
@Transactional
public class CustomAdministrateurDetailsService implements UserDetailsService {
	 @Autowired
	    private DAO.AdministrateurRepository AdministrateurRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		 administrateur administrateur = AdministrateurRepository.findByEmail(username);
	        return new org.springframework.security.core.userdetails.User(administrateur.getEmail(), administrateur.getMdp(), new ArrayList<>());
	}

}