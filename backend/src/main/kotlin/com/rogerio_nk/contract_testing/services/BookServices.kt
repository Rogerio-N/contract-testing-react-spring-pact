package com.rogerio_nk.contract_testing.services

import com.rogerio_nk.contract_testing.entities.BookEntity
import com.rogerio_nk.contract_testing.repositories.BookRepository
import org.springframework.stereotype.Service

@Service
class BookServices(
    private val bookRepository: BookRepository
) {

    fun getBooks() : List<BookEntity> {
        return bookRepository.findAll()
    }

}