package com.rogerio_nk.contract_testing

import au.com.dius.pact.provider.junit5.HttpTestTarget
import au.com.dius.pact.provider.junit5.PactVerificationContext
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider
import au.com.dius.pact.provider.junitsupport.Provider
import au.com.dius.pact.provider.junitsupport.State
import au.com.dius.pact.provider.junitsupport.loader.PactBroker
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.TestTemplate
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.context.junit.jupiter.SpringExtension


@Provider("booksProvider")
@PactBroker(url = "http://localhost:9292")
@ExtendWith(SpringExtension::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IntegrationTest {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    @LocalServerPort
    var port: Int = 0

    @BeforeEach
    fun setUp(context: PactVerificationContext) {
        context.target = HttpTestTarget("localhost", port)
    }

    @AfterEach
    fun tearDown() {
        jdbcTemplate.execute("DELETE FROM BOOKS")
    }

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider::class)
    fun pactVerificationTestTemplate(context: PactVerificationContext) {
        context.verifyInteraction()
    }

    @State("all fields are filled")
    fun booksAllFields(){
        jdbcTemplate.execute(
            "INSERT INTO BOOKS (title, author, description, created_at, updated_at) " +
                    "VALUES ('Title', 'Author', 'Description', '2025-01-01 00:00:00', '2025-01-01 00:00:00')"
        )
    }

    @State("only required fields are filled")
    fun booksOnlyRequiredFields(){
        jdbcTemplate.execute(
            "INSERT INTO BOOKS (title, author, description, created_at, updated_at) " +
                    "VALUES ('Title', 'Author', null, '2025-01-01 00:00:00', '2025-01-01 00:00:00')"
        )
    }

}