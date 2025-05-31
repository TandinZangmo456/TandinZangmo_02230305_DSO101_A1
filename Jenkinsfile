pipeline {
    agent any
    tools {
        nodejs 'NodeJS-24.0.2'  // This should match your Node.js installation name in Jenkins
    }

    environment {
        DOCKER_IMAGE = 'pengiuntandinzangmo/node-app'   // Replace with your Docker Hub username
    }

    stages {
        // Stage 1: Checkout Code from GitHub
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/TandinZangmo456/TandinZangmo_02230305_DSO101_A1.git',
                        credentialsId: 'github-credentials'  // Replace with your GitHub credentials ID
                    ]]
                ])
            }
        }

        // Stage 2: Install Dependencies
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        // Stage 3: Build (if your project has a build step)
        stage('Build') {
            when {
                expression { 
                    return fileExists('package.json') && 
                    sh(returnStdout: true, script: 'jq -e ".scripts.build" package.json').trim() != 'null'
                }
            }
            steps {
                sh 'npm run build'
            }
        }

        // Stage 4: Run Unit Tests with JUnit reporting
        stage('Test') {
            steps {
                sh 'npm test -- --reporters=default --reporters=jest-junit'
            }
            post {
                always {
                    junit 'junit.xml'  // Publish test results
                }
            }
        }

        // Stage 5: Docker Build and Push (optional)
        stage('Deploy') {
            when {
                expression { return env.BRANCH_NAME == 'main' }  // Only deploy from main branch
            }
            steps {
                script {
                    // Build Docker image
                    docker.build("${env.DOCKER_IMAGE}:latest")
                    
                    // Login and push to Docker Hub (if credentials are set up)
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                        sh "echo ${env.DOCKER_PASSWORD} | docker login -u ${env.DOCKER_USERNAME} --password-stdin"
                        sh "docker push ${env.DOCKER_IMAGE}:latest"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean up workspace after build
        }
    }
}