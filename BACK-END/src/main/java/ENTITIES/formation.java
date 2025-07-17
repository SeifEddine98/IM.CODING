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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
@Entity
public class formation implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.
	IDENTITY)
	private Integer id;
	@NotNull
	private String titre;
	@NotNull
	private Date date_debut;
	@NotNull
	private Date date_fin;
	
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "formateur_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private formateur formateur;
    
    @OneToMany(mappedBy = "formation")
    @JsonBackReference
	private List<seance> seances = new ArrayList<seance>();

	public formation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public formation(Integer id, String titre, Date date_debut, Date date_fin, ENTITIES.formateur formateur,
			ArrayList<seance> seances) {
		super();
		this.id = id;
		this.titre = titre;
		this.date_debut = date_debut;
		this.date_fin = date_fin;
		this.formateur = formateur;
		this.seances = seances;
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

	public formateur getFormateur() {
		return formateur;
	}

	public void setFormateur(formateur formateur) {
		this.formateur = formateur;
	}

	public ArrayList<seance> getSeances() {
		return (ArrayList<seance>) seances;
	}

	public void setSeances(ArrayList<seance> seances) {
		this.seances = seances;
	}

	@Override
	public String toString() {
		return "formation [id=" + id + ", titre=" + titre + ", date_debut=" + date_debut + ", date_fin=" + date_fin
				+ ", formateur=" + formateur + ", seances=" + seances + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date_debut == null) ? 0 : date_debut.hashCode());
		result = prime * result + ((date_fin == null) ? 0 : date_fin.hashCode());
		result = prime * result + ((formateur == null) ? 0 : formateur.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((seances == null) ? 0 : seances.hashCode());
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
		formation other = (formation) obj;
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
		if (seances == null) {
			if (other.seances != null)
				return false;
		} else if (!seances.equals(other.seances))
			return false;
		if (titre == null) {
			if (other.titre != null)
				return false;
		} else if (!titre.equals(other.titre))
			return false;
		return true;
	}
	
}
