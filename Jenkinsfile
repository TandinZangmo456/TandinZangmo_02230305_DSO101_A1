pipeline {
    agent any
    tools {
        nodejs 'NodeJS-24.0.2'  // This should match the Node.js installation name in Jenkins
    }

    environment {
        DOCKER_HUB_CREDS = credentials('dockerhub-creds')  // Docker Hub credentials ID from Jenkins
        DOCKER_IMAGE = 'penguintandinzangmo/node-app'   // Replace with your Docker Hub username
    }

    stages {
        // Stage 1: Checkout Code from GitHub
        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/TandinZangmo456/TandinZangmo_02230305_DSO101_A1',
                credentialsId: 'github-credentials'  // Your GitHub PAT credentials ID from Jenkins
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
                expression { fileExists('package.json') && 
                            sh(returnStdout: true, script: 'jq -e ".scripts.build" package.json').trim() != 'null' }
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

        // Stage 5: Deploy (Docker Example)
    	stage('Deploy') {
        	steps {
            	script {
                	// Build Docker image
                	docker.build('penguintandinzangmo/node-app:latest')
               	 
                	// Push to Docker Hub (requires credentials)
                	docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-creds') {
                    	docker.image('penguintandinzangmo/node-app:latest').push()
                	}
            	}
        	}
    	}

        }
    }

    post {
        always {
            cleanWs()  // Clean up workspace after build
        }
        success {
            slackSend(color: 'good', message: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            slackSend(color: 'danger', message: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}