def imagename = "sheethalbangera/simple-banking"
def dockerImage = ''

 

node {
    def sonarScanner = tool name: 'forSonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    stage('Cloning Git') {
        git(url: 'https://github.com/SheethalBangera/simple-bank-system.git', branch: 'master')
    }
    stage('Build Project') {
        sh "npm install"
    }
    stage('SonarQube Analysis'){
          withSonarQubeEnv(credentialsId: 'SonarCred') {
           sh "${sonarScanner}/bin/sonar-scanner -Dsonar.projectKey=simple-bank-system -Dsonar.sources=."
            } 
    }
    stage("Test") {
        sh "npm install mocha"
        sh "npm run test"
    }
    stage('Building image') {
        script {
          dockerImage = docker.build imagename
      }
    }
    stage('Deploy Image') {
          withCredentials([usernamePassword(credentialsId: 'DocCred', passwordVariable: 'DocCredPassword', usernameVariable: 'DocCredUser')]) {
            sh "docker login -u ${env.DocCredUser} -p ${env.DocCredPassword}"
            sh 'docker push sheethalbangera/simple-banking:latest'
      }
    }
    node('Kubes') {
        stage('Run App') {
            sh """
                #kubectl create deployment kubernetes-bootcamp --image=docker.io/sheethalbangera/simple-banking:latest --port=8090 
                kubectl get pods
            """
        }
    }
}
