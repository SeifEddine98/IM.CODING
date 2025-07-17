package Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import SERVICE.CustomUserDetailsService;
import SERVICE.CustomAdministrateurDetailsService;
import SERVICE.CustomFormateurDetailsService;
import SERVICE.CustomGestionnaireDetailsService;
import filter.JwtFilter;
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
    private CustomUserDetailsService CustomUserDetailsService;
	@Autowired
    private CustomFormateurDetailsService formateurDetailsService;
	@Autowired
    private CustomGestionnaireDetailsService gestionnaireDetailsService;
	@Autowired
    private CustomAdministrateurDetailsService administrateurDetailsService;
	@Autowired
    private JwtFilter jwtFilter;
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	    auth.userDetailsService(CustomUserDetailsService);
	}

	 @Bean
	    public PasswordEncoder passwordEncoder(){
	        return NoOpPasswordEncoder.getInstance();
	    }
	 @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	    @Override
	    public AuthenticationManager authenticationManagerBean() throws Exception {
	        return super.authenticationManagerBean();
	    }
	    @Override
	    protected void configure(HttpSecurity http) throws Exception {
	        http.csrf().disable().authorizeRequests().antMatchers("/Gestionnaire/authenticate",
	        		"/Formateur/authenticate","/Administrateur/authenticate",
	        		"/Gestionnaire/getFormateurPhotoById/{id}","/Administrateur/getGestionnairePhotoById/{id}",
	        		"/Administrateur/getAdminPhotoById/{id}")
	                .permitAll().anyRequest().authenticated()
	                .and().exceptionHandling().and().sessionManagement()
	                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	                .and().cors();
	        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);;
	    }

}
