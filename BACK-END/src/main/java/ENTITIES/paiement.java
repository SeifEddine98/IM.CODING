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
public class paiement implements Serializable {
	@Id
	@GeneratedValue(strategy=GenerationType.
	IDENTITY)
	private Integer id;
	@NotNull
	private LocalDateTime date_paiement=LocalDateTime.now();
	@NotNull
	private int montant;
	@ManyToOne
	@JoinColumn(name = "facture_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private facture facture;
	public paiement() {
		super();
		// TODO Auto-generated constructor stub
	}
	public paiement(Integer id, LocalDateTime date_paiement, int montant, ENTITIES.facture facture) {
		super();
		this.id = id;
		this.date_paiement = date_paiement;
		this.montant = montant;
		this.facture = facture;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public LocalDateTime getDate_paiement() {
		return date_paiement;
	}
	public void setDate_paiement(LocalDateTime date_paiement) {
		this.date_paiement = date_paiement;
	}
	public int getMontant() {
		return montant;
	}
	public void setMontant(int montant) {
		this.montant = montant;
	}
	public facture getFacture() {
		return facture;
	}
	public void setFacture(facture facture) {
		this.facture = facture;
	}
	@Override
	public String toString() {
		return "paiement [id=" + id + ", date_paiement=" + date_paiement + ", montant=" + montant + ", facture="
				+ facture + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date_paiement == null) ? 0 : date_paiement.hashCode());
		result = prime * result + ((facture == null) ? 0 : facture.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + montant;
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
		paiement other = (paiement) obj;
		if (date_paiement == null) {
			if (other.date_paiement != null)
				return false;
		} else if (!date_paiement.equals(other.date_paiement))
			return false;
		if (facture == null) {
			if (other.facture != null)
				return false;
		} else if (!facture.equals(other.facture))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (montant != other.montant)
			return false;
		return true;
	}
	
}
