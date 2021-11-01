package com.demo.project89.controller;

import java.util.Date;

import com.demo.project89.domain.Customer;
import com.demo.project89.repo.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class HomeController {

    final CustomerRepository customerRepo;

    @GetMapping(value = "/api/time")
    public Date serverTime() {
        log.info("Getting server time!");
        return new Date();
    }

    @GetMapping(value = "/api/customer")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public Iterable<Customer> getCustomers() {
        return customerRepo.findAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping(value = "/api/customer")
    public Customer saveCustomer(@RequestBody Customer customer) {
        log.info("Saving customer!");
        return customerRepo.save(customer);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/api/customer/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        log.info("Deleting customer: {}", id);
        customerRepo.deleteById(id);
    }

}
