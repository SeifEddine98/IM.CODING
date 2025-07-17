package SERVICE;
import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ENTITIES.formateur;
@Service
@Transactional
public class CustomFormateurDetailsService implements UserDetailsService {
	 @Autowired
	    private DAO.FormateurRepository FormateurRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		 formateur formateur = FormateurRepository.findByEmail(username);
	        return new org.springframework.security.core.userdetails.User(formateur.getEmail(), formateur.getMdp(), new ArrayList<>());
	}

}
