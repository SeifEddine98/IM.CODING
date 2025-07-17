package ENTITIES;

import java.io.IOException;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

@Entity
public class conge implements Serializable {
	@Id
	@GeneratedValue(strategy=GenerationType.
	IDENTITY)
	private Integer id;
	@NotNull
	private String nom;
	@NotNull
	private String prenom;
	@NotNull
	private String cause;
	@NotNull
	private Date date_debut;
	@NotNull
	private Date date_fin;
	private boolean valide;
	private String reponse;
	@Lob
	@Column(name = "justificatif")
	private byte[] justificatif;
	@ManyToOne
	@JoinColumn(name = "formateur_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private formateur formateur;
	public conge() {
		super();
		// TODO Auto-generated constructor stub
	}
	public conge(Integer id, String nom, String prenom, String cause, Date date_debut, Date date_fin, boolean valide,
			byte[] justificatif, ENTITIES.formateur formateur, String reponse) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.cause = cause;
		this.date_debut = date_debut;
		this.date_fin = date_fin;
		this.valide = valide;
		this.justificatif = justificatif;
		this.formateur = formateur;
		this.reponse = reponse;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getCause() {
		return cause;
	}
	public void setCause(String cause) {
		this.cause = cause;
	}
	public Date getDate_debut() {
		return date_debut;
	}
	public void setDate_debut(Date date_debut) {
		this.date_debut = date_debut;
	}
	public Date getDate_fin() {
		return date_fin;
	}
	public void setDate_fin(Date date_fin) {
		this.date_fin = date_fin;
	}
	public boolean isValide() {
		return valide;
	}
	public void setValide(boolean valide) {
		this.valide = valide;
	}
	public byte[] getJustificatif() {
		return justificatif;
	}
	public void setJustificatif(MultipartFile justificatif) throws IOException {
	    if (justificatif != null && !justificatif.isEmpty()) {
	        this.justificatif = justificatif.getBytes();
	    }
	}
	public formateur getFormateur() {
		return formateur;
	}
	public void setFormateur(formateur formateur) {
		this.formateur = formateur;
	}
	public String getReponse() {
		return reponse;
	}
	public void setReponse(String reponse) {
		this.reponse = reponse;
	}
	@Override
	public String toString() {
		return "conge [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", cause=" + cause + ", date_debut="
				+ date_debut + ", date_fin=" + date_fin + ", valide=" + valide + ", reponse=" + reponse
				+ ", justificatif=" + Arrays.toString(justificatif) + ", formateur=" + formateur + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cause == null) ? 0 : cause.hashCode());
		result = prime * result + ((date_debut == null) ? 0 : date_debut.hashCode());
		result = prime * result + ((date_fin == null) ? 0 : date_fin.hashCode());
		result = prime * result + ((formateur == null) ? 0 : formateur.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + Arrays.hashCode(justificatif);
		result = prime * result + ((nom == null) ? 0 : nom.hashCode());
		result = prime * result + ((prenom == null) ? 0 : prenom.hashCode());
		result = prime * result + ((reponse == null) ? 0 : reponse.hashCode());
		result = prime * result + (valide ? 1231 : 1237);
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		conge other = (conge) obj;
		if (cause == null) {
			if (other.cause != null)
				return false;
		} else if (!cause.equals(other.cause))
			return false;
		if (date_debut == null) {
			if (other.date_debut != null)
				return false;
		} else if (!date_debut.equals(other.date_debut))
			return false;
		if (date_fin == null) {
			if (other.date_fin != null)
				return false;
		} else if (!date_fin.equals(other.date_fin))
			return false;
		if (formateur == null) {
			if (other.formateur != null)
				return false;
		} else if (!formateur.equals(other.formateur))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (!Arrays.equals(justificatif, other.justificatif))
			return false;
		if (nom == null) {
			if (other.nom != null)
				return false;
		} else if (!nom.equals(other.nom))
			return false;
		if (prenom == null) {
			if (other.prenom != null)
				return false;
		} else if (!prenom.equals(other.prenom))
			return false;
		if (reponse == null) {
			if (other.reponse != null)
				return false;
		} else if (!reponse.equals(other.reponse))
			return false;
		if (valide != other.valide)
			return false;
		return true;
	}
	
}
