package ENTITIES;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

@Entity
public class seance implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.
	IDENTITY)
	private Integer id;
	@NotNull
	private String titre;
	@NotNull
	private String notes;
	@NotNull
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private Date date_debut;
	@NotNull
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private Date date_fin;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "formation_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler","formateur"})
	//@JsonBackReference
	private formation formation;
	public seance() {
		super();
		// TODO Auto-generated constructor stub
	}
	public seance(Integer id, String titre, String notes, Date date_debut, Date date_fin,
			ENTITIES.formation formation) {
		super();
		this.id = id;
		this.titre = titre;
		this.notes = notes;
		this.date_debut = date_debut;
		this.date_fin = date_fin;
		this.formation = formation;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
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
	public formation getFormation() {
		return formation;
	}
	public void setFormation(formation formation) {
		this.formation = formation;
	}
	@Override
	public String toString() {
		return "seance [id=" + id + ", titre=" + titre + ", notes=" + notes + ", date_debut=" + date_debut
				+ ", date_fin=" + date_fin + ", formation=" + formation + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date_debut == null) ? 0 : date_debut.hashCode());
		result = prime * result + ((date_fin == null) ? 0 : date_fin.hashCode());
		result = prime * result + ((formation == null) ? 0 : formation.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((notes == null) ? 0 : notes.hashCode());
		result = prime * result + ((titre == null) ? 0 : titre.hashCode());
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
		seance other = (seance) obj;
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
		if (notes == null) {
			if (other.notes != null)
				return false;
		} else if (!notes.equals(other.notes))
			return false;
		if (titre == null) {
			if (other.titre != null)
				return false;
		} else if (!titre.equals(other.titre))
			return false;
		return true;
	}
	
}
