package com.rogerio_nk.contract_testing.repositories

import com.rogerio_nk.contract_testing.entities.BookEntity
import org.springframework.data.jpa.repository.JpaRepository

interface BookRepository: JpaRepository<BookEntity, Long> {
}