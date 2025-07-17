package SERVICE;

import javax.transaction.Transactional;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendCredentialsEmail(String email, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Coordonnées de connexion IM.CODING");
        message.setText("Bienvenue chez nous. \n\n" +
        		"Voici vos coordonnées de connexion :\n\n" +
                "Email: " + email + "\n" +
                "Mot de passe: " + password + "\n\n" +
                "NB: Vous pouvez accéder à votre espace et changer vos coordonnées selon vos besoins. \n\n"+
                "Bien cordialement.");
        mailSender.send(message);
    }

    public void sendUpdateEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Mise à jour de votre compte IM.CODING");
        message.setText(
        		"Votre compte chez nous à subi des modifications :\n\n" +
                "NB: Si ce n'est pas votre activité merci de nous contacter. \n\n"+
                "Bien cordialement.");
        mailSender.send(message);
    }
}
