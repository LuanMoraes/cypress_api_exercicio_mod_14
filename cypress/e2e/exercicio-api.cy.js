/// <reference types="cypress" />
import { expression } from 'joi';
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
         cy.request('usuarios').then(response=>{
          contrato.validateAsync(response.body)
         })
    });

    it('Deve listar usuários cadastrados', () => {
         cy.listarUsuarios()
    });

    it('Deve cadastrar um usuário com sucesso', () => {
     cy.cadastrarUsuario('Luan1', 'luan1_teste@teste.com','teste@luan', 'true').then(response=>{
          expect(response.status).to.eql(201);
          expect(response.body.message).to.equal('Cadastro realizado com sucesso');
     })
    });

    it('Deve validar um usuário com email inválido', () => {
     cy.cadastrarUsuario('Luan1', 'luan1_teste@teste.com','teste@luan', 'true').then(response=>{
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Este email já está sendo usado');
     })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
     cy.listarUsuarios().then(response=>{
          let id = response.body.usuarios[0]._id;
          cy.editarUsuario(id).then(response=>{
               expect(response.status).to.equal(200);
               expect(response.body.message).to.equal('Registro alterado com sucesso');
          })
     })
    });

    it.only('Deve deletar um usuário previamente cadastrado', () => {
        cy.listarUsuarios().then(response=>{
          let id = response.body.usuarios[0]._id;
          cy.deletarUsuario(id);
        })
    });
});
