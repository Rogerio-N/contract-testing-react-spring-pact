package com.rogerio_nk.contract_testing.controllers

import com.rogerio_nk.contract_testing.entities.BookEntity
import com.rogerio_nk.contract_testing.services.BookServices
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v1/books")
class BookControllers(
    private val bookServices: BookServices
) {

    @GetMapping
    @CrossOrigin
    fun getBooks() : List<BookEntity> {
        return bookServices.getBooks()
    }

}