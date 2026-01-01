package com.fingerpay.repository;

import com.fingerpay.model.FingerprintMap;
import com.fingerpay.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FingerprintMapRepository extends JpaRepository<FingerprintMap, Long> {
    Optional<FingerprintMap> findByFingerKeyAndUser(String fingerKey, User user);
}
