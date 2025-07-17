package ENTITIES;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
@Entity
public class facture implements Serializable {
	@Id
	@GeneratedValue(strategy=GenerationType.
	IDENTITY)
	private Integer id;
	@NotNull
	private LocalDateTime date_emission=LocalDateTime.now();
	@NotNull
	private int montant_total;
	@NotNull
	private String formation;
	@NotNull
	private int montant_paye;
	@NotNull
	private int montant_restant;
	@NotNull
	private boolean payee;
	@ManyToOne
	@JoinColumn(name = "etudiant_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private etudiant etudiant;
	public facture() {
		super();
		// TODO Auto-generated constructor stub
	}
	public facture(Integer id, LocalDateTime date_emission, int montant_total, String formation, int montant_paye,
			int montant_restant, boolean payee, ENTITIES.etudiant etudiant) {
		super();
		this.id = id;
		this.date_emission = date_emission;
		this.montant_total = montant_total;
		this.formation = formation;
		this.montant_paye = montant_paye;
		this.montant_restant = montant_restant;
		this.payee = payee;
		this.etudiant = etudiant;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public LocalDateTime getDate_emission() {
		return date_emission;
	}
	public void setDate_emission(LocalDateTime date_emission) {
		this.date_emission = date_emission;
	}
	public int getMontant_total() {
		return montant_total;
	}
	public void setMontant_total(int montant_total) {
		this.montant_total = montant_total;
	}
	public String getFormation() {
		return formation;
	}
	public void setFormation(String formation) {
		this.formation = formation;
	}
	public int getMontant_paye() {
		return montant_paye;
	}
	public void setMontant_paye(int montant_paye) {
		this.montant_paye = montant_paye;
	}
	public int getMontant_restant() {
		return montant_restant;
	}
	public void setMontant_restant(int montant_restant) {
		this.montant_restant = montant_restant;
	}
	public boolean isPayee() {
		return payee;
	}
	public void setPayee(boolean payee) {
		this.payee = payee;
	}
	public etudiant getEtudiant() {
		return etudiant;
	}
	public void setEtudiant(etudiant etudiant) {
		this.etudiant = etudiant;
	}
	@Override
	public String toString() {
		return "facture [id=" + id + ", date_emission=" + date_emission + ", montant_total=" + montant_total
				+ ", formation=" + formation + ", montant_paye=" + montant_paye + ", montant_restant=" + montant_restant
				+ ", payee=" + payee + ", etudiant=" + etudiant + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date_emission == null) ? 0 : date_emission.hashCode());
		result = prime * result + ((etudiant == null) ? 0 : etudiant.hashCode());
		result = prime * result + ((formation == null) ? 0 : formation.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + montant_paye;
		result = prime * result + montant_restant;
		result = prime * result + montant_total;
		result = prime * result + (payee ? 1231 : 1237);
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
		facture other = (facture) obj;
		if (date_emission == null) {
			if (other.date_emission != null)
				return false;
		} else if (!date_emission.equals(other.date_emission))
			return false;
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
		if (montant_paye != other.montant_paye)
			return false;
		if (montant_restant != other.montant_restant)
			return false;
		if (montant_total != other.montant_total)
			return false;
		if (payee != other.payee)
			return false;
		return true;
	}
	
	
}
