package ENTITIES;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
public class etudiant_formation implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.
	IDENTITY)
	private Integer id;
    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private etudiant etudiant;
    @ManyToOne
    @JoinColumn(name = "formation_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "formateur"})
    private formation formation;
	public etudiant_formation() {
		super();
		// TODO Auto-generated constructor stub
	}
	public etudiant_formation(Integer id, ENTITIES.etudiant etudiant, ENTITIES.formation formation) {
		super();
		this.id = id;
		this.etudiant = etudiant;
		this.formation = formation;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public etudiant getEtudiant() {
		return etudiant;
	}
	public void setEtudiant(etudiant etudiant) {
		this.etudiant = etudiant;
	}
	public formation getFormation() {
		return formation;
	}
	public void setFormation(formation formation) {
		this.formation = formation;
	}
	@Override
	public String toString() {
		return "etudiant_formation [id=" + id + ", etudiant=" + etudiant + ", formation=" + formation + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((etudiant == null) ? 0 : etudiant.hashCode());
		result = prime * result + ((formation == null) ? 0 : formation.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		etudiant_formation other = (etudiant_formation) obj;
		if (etudiant == null) {
			if (other.etudiant != null)
				return false;
		} else if (!etudiant.equals(other.etudiant))
			return false;
		if (formation == null) {
			if (other.formation != null)
				return false;
		} else if (!formation.equals(other.formation))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
    
}
