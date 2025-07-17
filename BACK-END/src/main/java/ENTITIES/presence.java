package ENTITIES;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

@Entity
public class presence implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.
	IDENTITY)
	private Integer id;
	@NotNull
	private boolean present;
	
	@ManyToOne
	@JoinColumn(name = "seance_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private seance seance;
	
	@ManyToOne
	@JoinColumn(name = "etudiant_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private etudiant etudiant;
	@Transient
	private int nbPresences;

	@Transient
	private int nbAbsences;
	public presence() {
		super();
		// TODO Auto-generated constructor stub
	}

	public presence(Integer id, boolean present, ENTITIES.seance seance, ENTITIES.etudiant etudiant, int nbPresences, int nbAbsences) {
		super();
		this.id = id;
		this.present = present;
		this.seance = seance;
		this.etudiant = etudiant;
		this.nbPresences = nbPresences;
		this.nbAbsences = nbAbsences;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public boolean isPresent() {
		return present;
	}

	public void setPresent(boolean present) {
		this.present = present;
	}

	public seance getSeance() {
		return seance;
	}

	public void setSeance(seance seance) {
		this.seance = seance;
	}

	public etudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(etudiant etudiant) {
		this.etudiant = etudiant;
	}

	public int getNbPresences() {
		return nbPresences;
	}

	public void setNbPresences(int nbPresences) {
		this.nbPresences = nbPresences;
	}

	public int getNbAbsences() {
		return nbAbsences;
	}

	public void setNbAbsences(int nbAbsences) {
		this.nbAbsences = nbAbsences;
	}

	@Override
	public String toString() {
		return "presence [id=" + id + ", present=" + present + ", seance=" + seance + ", etudiant=" + etudiant
				+ ", nbPresences=" + nbPresences + ", nbAbsences=" + nbAbsences + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((etudiant == null) ? 0 : etudiant.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + nbAbsences;
		result = prime * result + nbPresences;
		result = prime * result + (present ? 1231 : 1237);
		result = prime * result + ((seance == null) ? 0 : seance.hashCode());
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
		presence other = (presence) obj;
		if (etudiant == null) {
			if (other.etudiant != null)
				return false;
		} else if (!etudiant.equals(other.etudiant))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (nbAbsences != other.nbAbsences)
			return false;
		if (nbPresences != other.nbPresences)
			return false;
		if (present != other.present)
			return false;
		if (seance == null) {
			if (other.seance != null)
				return false;
		} else if (!seance.equals(other.seance))
			return false;
		return true;
	}


	
}
