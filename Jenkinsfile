pipeline {
    agent any
    tools {
        nodejs 'NodeJS-24.0.2'  // Make sure this matches your Node.js installation in Jenkins
    }

    stages {
        // Stage 1: Checkout Code
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/TandinZangmo456/TandinZangmo_02230305_DSO101_A1',
                        credentialsId: 'github-credentials'
                    ]]
                ])
                sh 'ls -la'  // Verify repository structure
            }
        }

        // Stage 2: Backend Installation & Build
        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    // If you have any backend-specific build steps
                    sh 'npm run build || echo "No build script found in backend"'
                }
            }
        }

        // Stage 3: Frontend Installation & Build
        stage('Frontend Setup') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    // Frontend typically needs a build step
                    sh 'npm run build || echo "No build script found in frontend"'
                }
            }
        }

        // Stage 4: Backend Testing
        stage('Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm test -- --reporters=default --reporters=jest-junit || echo "Tests failed"'
                }
            }
            post {
                always {
                    junit 'backend/junit.xml'
                }
            }
        }

        // Stage 5: Frontend Testing (if applicable)
        stage('Frontend Tests') {
            when {
                expression { fileExists('frontend/package.json') }
            }
            steps {
                dir('frontend') {
                    sh 'npm test -- --reporters=default --reporters=jest-junit || echo "Tests failed"'
                }
            }
            post {
                always {
                    junit 'frontend/junit.xml'
                }
            }
        }

        // Stage 6: Docker Build (Optional)
        stage('Docker Build') {
            when {
                expression { return env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    // Build backend Docker image
                    if (fileExists('backend/Dockerfile')) {
                        docker.build("penguintandinzangmo/todo-app-backend:latest", './backend')
                    }
                    
                    // Build frontend Docker image
                    if (fileExists('frontend/Dockerfile')) {
                        docker.build("penguintandinzangmo/todo-app-frontend:latest", './frontend')
                    }
                }
            }
        }

        // Stage 7: Docker Push (Optional)
        stage('Docker Push') {
            when {
                expression { return env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                        sh "echo ${env.DOCKER_PASSWORD} | docker login -u ${env.DOCKER_USERNAME} --password-stdin"
                        
                        if (fileExists('backend/Dockerfile')) {
                            sh "docker push penguintandinzangmo/todo-app-backend:latest"
                        }
                        
                        if (fileExists('frontend/Dockerfile')) {
                            sh "docker push penguintandinzangmo/todo-app-frontend:latest"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            script {
                currentBuild.description = "Build ${currentBuild.result}"
            }
        }
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}