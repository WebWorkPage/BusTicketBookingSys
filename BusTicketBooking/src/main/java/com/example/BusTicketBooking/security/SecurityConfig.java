package com.example.BusTicketBooking.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.BusTicketBooking.model.User;
import com.example.BusTicketBooking.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
	public UserDetailsService userDetailsService() {
		return email -> {
			User user = userService.findByEmail(email);
			if(user != null) {     //if that user obj is present in DB
				return org.springframework.security.core.userdetails.User
						.withUsername(user.getEmail())
						.password(user.getPassword())
						.roles(user.getRole())
						.build();
			}
			else {
				throw new UsernameNotFoundException("User not found");
			}
		};
	}
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
	
	@Bean
     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
//            .requestMatchers("/register", "/error").permitAll()
        		 .requestMatchers("/register","/page/login").permitAll()
            .anyRequest().authenticated()
        )
//        .sessionManagement(s -> s
//                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
//        );
        .httpBasic(Customizer.withDefaults())
		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//        .formLogin(form -> form
//            .loginPage("/page/login")
//            .permitAll()
//        );
    return http.build();
		
		
				
//        httpSecurity.cors(cors -> cors.configurationSource(corsConfigurationSource()))
//        .csrf(csrf -> csrf.disable())
//        .authorizeHttpRequests(auth -> auth
//            .requestMatchers("/register", "/page/login").permitAll()
//            .anyRequest().authenticated()
//        )
//        .httpBasic(httpBasic -> {});
//    return httpSecurity.build();
    
//        httpSecurity.csrf(csrf -> csrf.disable())
//        .authorizeHttpRequests(auth -> auth
//            .requestMatchers("/register", "/page/login").permitAll()
//            .anyRequest().authenticated()
//        )
////        .and()
////        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////        .and()
//        .httpBasic(httpBasic->{});
//    return httpSecurity.build();
    
//    	    httpSecurity.csrf(csrf -> csrf.disable())
//            .authorizeHttpRequests(authorizeRequests ->
//                authorizeRequests.requestMatchers("/register", "/page/login").permitAll()
//                    .anyRequest().authenticated()
//            )
//            .httpBasic(Customizer.withDefaults());
//        return httpSecurity.build();
     }
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
}
