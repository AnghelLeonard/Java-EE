package com.sample.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import javax.json.bind.annotation.JsonbDateFormat;
import javax.json.bind.annotation.JsonbNumberFormat;
import javax.json.bind.annotation.JsonbProperty;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "products")
public class Product implements Serializable {
    
    private static final long serialVersionUID = 1L; 

    @Id
    @NotNull
    @Column(name = "id")
    @JsonbProperty(nillable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonbProperty("product-name")
    @Column(name = "product_name")
    private String name;

    @JsonbProperty(value = "product-brand", nillable = true)
    @Column(name = "brand")
    private String brand;

    @JsonbTransient
    @Column(name = "random_sku")
    private int sku;

    @JsonbProperty("product-arrival-date")
    @JsonbDateFormat("dd-MM-yyyy")
    @Column(name = "arrival_date")
    private LocalDate arrivalDate;

    @JsonbProperty("product-price")
    @Column(name = "price", precision = 11, scale = 2)
    private BigDecimal price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
        
    @JsonbNumberFormat(locale = "en_US", value = "#0.0")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public int getSku() {
        return sku;
    }

    public void setSku(int sku) {
        this.sku = sku;
    }

    public LocalDate getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(LocalDate arrivalDate) {
        this.arrivalDate = arrivalDate;
    }  
}
