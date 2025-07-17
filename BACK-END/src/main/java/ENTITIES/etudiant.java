package ENTITIES;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

@Entity
public class etudiant implements Serializable {
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
	private Date dateNaiss;
	@NotNull
	@Column(unique=true)
	private String email;
	@NotNull
	private Long telephone;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "etudiant_formation", joinColumns = {
			@JoinColumn(name = "etudiant_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "formation_id", referencedColumnName = "id") })
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "formateur"})
	private List<formation> formations = new ArrayList<>();
	public etudiant() {
		super();
		// TODO Auto-generated constructor stub
	}
	public etudiant(Integer id, Long cin, String nom, String prenom, String adresse, Date dateNaiss, String email,
			Long telephone, List<formation> formations) {
		super();
		this.id = id;
		this.cin = cin;
		this.nom = nom;
		this.prenom = prenom;
		this.adresse = adresse;
		this.dateNaiss = dateNaiss;
		this.email = email;
		this.telephone = telephone;
		this.formations = formations;
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
	public Long getTelephone() {
		return telephone;
	}
	public void setTelephone(Long telephone) {
		this.telephone = telephone;
	}
	
	public List<formation> getFormations() {
		return formations;
	}
	public void setFormations(List<formation> formations) {
		this.formations = formations;
	}
	@Override
	public String toString() {
		return "etudiant [id=" + id + ", cin=" + cin + ", nom=" + nom + ", prenom=" + prenom + ", adresse=" + adresse
				+ ", dateNaiss=" + dateNaiss + ", email=" + email + ", telephone=" + telephone + ", formations="
				+ formations + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((adresse == null) ? 0 : adresse.hashCode());
		result = prime * result + ((cin == null) ? 0 : cin.hashCode());
		result = prime * result + ((dateNaiss == null) ? 0 : dateNaiss.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((formations == null) ? 0 : formations.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((nom == null) ? 0 : nom.hashCode());
		result = prime * result + ((prenom == null) ? 0 : prenom.hashCode());
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
		etudiant other = (etudiant) obj;
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
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (formations == null) {
			if (other.formations != null)
				return false;
		} else if (!formations.equals(other.formations))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
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
		if (telephone == null) {
			if (other.telephone != null)
				return false;
		} else if (!telephone.equals(other.telephone))
			return false;
		return true;
	}
}