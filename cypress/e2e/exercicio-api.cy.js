/// <reference types="cypress" />
import { expression } from 'joi';
import contrato from '../contracts/usuarios.contract'
import { reporters } from 'mocha';

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
         cy.request('usuarios').then(response=>{
          contrato.validateAsync(response.body)
         })
    });

    it('Deve listar usuários cadastrados', () => {
         cy.listarUsuarios().then(response=>{
          expect(response.status).to.eql(200);
         })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
     cy.cadastrarUsuario('Luan1', 'luan1_testador@teste.com','teste@luan', 'true').then(response=>{
          expect(response.status).to.eql(201);
          expect(response.body.message).to.equal('Cadastro realizado com sucesso');
     })
    });

    it('Deve validar um usuário com email repetido', () => {
     cy.cadastrarUsuario('Luan1', 'luan1_teste@teste.com','teste@luan', 'true').then(response=>{
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Este email já está sendo usado');
     })
    });

    it('Deve validar um usuário com email inválido', () => {
     cy.cadastrarUsuario('Luan1', 'luan1_teste@@teste.com','teste@luan', 'true').then(response=>{
          expect(response.body.email).to.equal('email deve ser um email válido');
     })
    });


    it('Deve editar um usuário previamente cadastrado', () => {
     let numero = Math.floor(Math.random()*10000000)
     cy.cadastrarUsuario("Luan",`luan_${numero}@email.com`,"senha1231","true")
     .then(response=>{
          cy.log(response.body._id);
          let id = response.body._id;
          cy.editarUsuario(id);
     }).then(response=>{
          expect(response.status).to.eql(200)
     })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
     let numero = Math.floor(Math.random()*10000000)
     cy.cadastrarUsuario("Luan",`luan_${numero}@email.com`,"senha1231","true")
     .then(response=>{
          let id = response.body._id;
          cy.deletarUsuario(id);
     }).then(response=>{
          expect(response.status).to.eql(200)
     })
    });
});
