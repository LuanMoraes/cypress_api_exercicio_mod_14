pipeline {
    agent any

    stages {
        stage('Clonando repositorio') {
            steps {
                https://github.com/LuanMoraes/testes-e2e-ebac-shop.git
            }
        }
        stage('Instalando dependencias') {
            steps {
                bat 'npm install'
            }
        }
        stage('Iniciando testes') {
            steps {
                bat 'npm run cy:run'
            }
        }
    }
}