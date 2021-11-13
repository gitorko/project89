package com.demo.project89;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.IntStream;

import com.demo.project89.domain.Customer;
import com.demo.project89.model.Role;
import com.demo.project89.model.Roles;
import com.demo.project89.model.User;
import com.demo.project89.repo.CustomerRepository;
import com.demo.project89.repo.RoleRepository;
import com.demo.project89.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
public class Main implements CommandLineRunner {

    final CustomerRepository customerRepo;
    final PasswordEncoder encoder;
    final UserRepository userRepository;
    final RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        //seed data
        List<String> city = Arrays.asList("London", "New York", "Bangalore");
        customerRepo.deleteAll();
        IntStream.range(1, 21).forEach(i -> {
            int randomIndex = new Random().nextInt(2 - 0 + 1) + 0;
            customerRepo.save(Customer.builder()
                    .firstName("first_" + i)
                    .lastName("last_" + i)
                    .city(city.get(randomIndex))
                    .build());
        });

        //Seed auth users data.
        roleRepository.save(Role.builder().roleName(Roles.ROLE_USER).build());
        roleRepository.save(Role.builder().roleName(Roles.ROLE_ADMIN).build());
        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setEmail("admin@admin.com");
        adminUser.setPassword(encoder.encode("admin@123"));
        Set<Role> adminRoleset = new HashSet<>();
        adminRoleset.add(roleRepository.findByRoleName(Roles.ROLE_USER).get());
        adminRoleset.add(roleRepository.findByRoleName(Roles.ROLE_ADMIN).get());
        adminUser.setRoles(adminRoleset);
        userRepository.save(adminUser);

        User user = new User();
        Set<Role> roles = new HashSet<>();
        user.setUsername("user");
        user.setEmail("user@admin.com");
        user.setPassword(encoder.encode("user@123"));
        roles.add(roleRepository.findByRoleName(Roles.ROLE_USER).get());
        user.setRoles(roles);
        userRepository.save(user);

    }
}
