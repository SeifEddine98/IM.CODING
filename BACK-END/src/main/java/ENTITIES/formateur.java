package ENTITIES;

import java.io.IOException;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.web.multipart.MultipartFile;

import com.sun.istack.NotNull;

@Entity
public class formateur implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.
	IDENTITY)
	private Integer id;
	@NotNull
	@Column(unique=true)
	private Long cin;
	@NotNull
	private String nom;
	@NotNull
	private String prenom;
	private String adresse;
	@NotNull
	private Date dateNaiss;
	@NotNull
	@Column(unique=true)
	private String email;
	@NotNull
	private String mdp;
	@NotNull
	private Long telephone;
	@NotNull
	private String domaine;
	@NotNull
	private String sousdomaine;
	@Lob
	@Column(name = "photo_profil")
	private byte[] photo_profil;
	public formateur() {
		super();
		// TODO Auto-generated constructor stub
	}
	public formateur(Integer id, Long cin, String nom, String prenom, String adresse, Date dateNaiss, String email,
			String mdp, Long telephone, String domaine, String sousdomaine, byte[] photo_profil) {
		super();
		this.id = id;
		this.cin = cin;
		this.nom = nom;
		this.prenom = prenom;
		this.adresse = adresse;
		this.dateNaiss = dateNaiss;
		this.email = email;
		this.mdp = mdp;
		this.telephone = telephone;
		this.domaine = domaine;
		this.sousdomaine = sousdomaine;
		this.photo_profil = photo_profil;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Long getCin() {
		return cin;
	}
	public void setCin(Long cin) {
		this.cin = cin;
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
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public Date getDateNaiss() {
		return dateNaiss;
	}
	public void setDateNaiss(Date dateNaiss) {
		this.dateNaiss = dateNaiss;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMdp() {
		return mdp;
	}
	public void setMdp(String mdp) {
		this.mdp = mdp;
	}
	public Long getTelephone() {
		return telephone;
	}
	public void setTelephone(Long telephone) {
		this.telephone = telephone;
	}
	public String getDomaine() {
		return domaine;
	}
	public void setDomaine(String domaine) {
		this.domaine = domaine;
	}
	public String getSousdomaine() {
		return sousdomaine;
	}
	public void setSousdomaine(String sousdomaine) {
		this.sousdomaine = sousdomaine;
	}
	public byte[] getPhoto_profil() {
		return photo_profil;
	}
	public void setPhoto_profil(MultipartFile photo_profil) throws IOException {
	    if (photo_profil != null && !photo_profil.isEmpty()) {
	        this.photo_profil = photo_profil.getBytes();
	    }
	}

	@Override
	public String toString() {
		return "formateur [id=" + id + ", cin=" + cin + ", nom=" + nom + ", prenom=" + prenom + ", adresse=" + adresse
				+ ", dateNaiss=" + dateNaiss + ", email=" + email + ", mdp=" + mdp + ", telephone=" + telephone
				+ ", domaine=" + domaine + ", sousdomaine=" + sousdomaine + ", photo_profil="
				+ Arrays.toString(photo_profil) + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((adresse == null) ? 0 : adresse.hashCode());
		result = prime * result + ((cin == null) ? 0 : cin.hashCode());
		result = prime * result + ((dateNaiss == null) ? 0 : dateNaiss.hashCode());
		result = prime * result + ((domaine == null) ? 0 : domaine.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((mdp == null) ? 0 : mdp.hashCode());
		result = prime * result + ((nom == null) ? 0 : nom.hashCode());
		result = prime * result + Arrays.hashCode(photo_profil);
		result = prime * result + ((prenom == null) ? 0 : prenom.hashCode());
		result = prime * result + ((sousdomaine == null) ? 0 : sousdomaine.hashCode());
		result = prime * result + ((telephone == null) ? 0 : telephone.hashCode());
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
		formateur other = (formateur) obj;
		if (adresse == null) {
			if (other.adresse != null)
				return false;
		} else if (!adresse.equals(other.adresse))
			return false;
		if (cin == null) {
			if (other.cin != null)
				return false;
		} else if (!cin.equals(other.cin))
			return false;
		if (dateNaiss == null) {
			if (other.dateNaiss != null)
				return false;
		} else if (!dateNaiss.equals(other.dateNaiss))
			return false;
		if (domaine == null) {
			if (other.domaine != null)
				return false;
		} else if (!domaine.equals(other.domaine))
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (mdp == null) {
			if (other.mdp != null)
				return false;
		} else if (!mdp.equals(other.mdp))
			return false;
		if (nom == null) {
			if (other.nom != null)
				return false;
		} else if (!nom.equals(other.nom))
			return false;
		if (!Arrays.equals(photo_profil, other.photo_profil))
			return false;
		if (prenom == null) {
			if (other.prenom != null)
				return false;
		} else if (!prenom.equals(other.prenom))
			return false;
		if (sousdomaine == null) {
			if (other.sousdomaine != null)
				return false;
		} else if (!sousdomaine.equals(other.sousdomaine))
			return false;
		if (telephone == null) {
			if (other.telephone != null)
				return false;
		} else if (!telephone.equals(other.telephone))
			return false;
		return true;
	}
	
}
