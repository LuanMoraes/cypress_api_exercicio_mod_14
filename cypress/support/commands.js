// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })

 Cypress.Commands.add('cadastrarUsuario', (nome, email, password, administrador)=>{
    cy.request({
        method:'POST',
        url:'usuarios',
        failOnStatusCode:false,
        body:{
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
        }
    })
 })

 Cypress.Commands.add('listarUsuarios',()=>{
    cy.request({
        method:'GET',
        failOnStatusCode: false,
        url:'usuarios'
    })
 })

 Cypress.Commands.add('editarUsuario',(id)=>{
    let numero = Math.floor(Math.random()*10000000)
    cy.request({
        method:'PUT',
        url:`usuarios/${id}`,
        failOnStatusCode: false,
        body:{
            "nome": 'nome editado',
            "email": `luan_editado_${numero}@gmail.com`,
            "password": 'senha_nova',
            "administrador": 'true'
        }
    })
 })

 Cypress.Commands.add('deletarUsuario',(id)=>{
    cy.request({
        method:'DELETE',
        failOnStatusCode: false,
        url:`usuarios/${id}`
    })
})
