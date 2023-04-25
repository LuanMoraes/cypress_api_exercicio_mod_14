
    stages {
        stage('Clonando repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/LuanMoraes/cypress_api_exercicio_mod_14.git'
            }
        }
        stage('Instalando dependencias') {
            steps {
                bat 'npm install'
            }
        }
        stage('Iniciando os testes') {
            steps {
                bat 'npm run cy:run'
            }
        }
    }
}