package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EntityScan( basePackages = {"ENTITIES"})
@ComponentScan( basePackages = {"CONTROLLERS","METIER","SERVICE","Util","filter","Config"})
@EnableJpaRepositories( basePackages = {"DAO"})
@CrossOrigin(origins ="http://localhost:4200")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
