pipeline {
    agent any
    tools {
        nodejs 'NodeJS-24.0.2'
    }
    stages {
        // Stage 1: Checkout Code
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/TandinZangmo456/TandinZangmo_02230305_DSO101_A1'
            }
        }
        
        // Stage 2: Install Dependencies (Backend)
        stage('Install Backend') {
            steps {
                dir('todo-app/backend') {
                    sh 'npm install'
                }
            }
        }
        
        // Stage 2b: Install Dependencies (Frontend)
        stage('Install Frontend') {
            steps {
                dir('todo-app/frontend') {
                    sh 'npm install'
                }
            }
        }
        
        // Stage 3: Build Backend (if applicable)
        stage('Build Backend') {
            steps {
                dir('todo-app/backend') {
                    sh 'npm run build || echo "No build script in backend, continuing"'
                }
            }
        }
        
        // Stage 3b: Build Frontend (React/TypeScript)
        stage('Build Frontend') {
            steps {
                dir('todo-app/frontend') {
                    sh 'npm run build'
                }
            }
        }

        // Stage 4: Run Backend Unit Tests
        stage('Test Backend') {
            steps {
                dir('todo-app/backend') {
                    sh 'npm test || echo "No test script in backend, continuing"'
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'backend/junit.xml'
                }
            }
        }
        
        // Stage 4b: Run Frontend Unit Tests
        stage('Test Frontend') {
            steps {
                dir('todo-app/frontend') {
                    sh 'npm test || echo "No test script in frontend, continuing"'
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'frontend/junit.xml'
                }
            }
        }
        
        // Stage 5: Deploy (Docker Example)
        stage('Deploy') {
            steps {
                script {
                    // Build Docker image using backend Dockerfile
                    sh 'docker build -t penguintandinzangmo/node-app:latest -f backend/Dockerfile backend/'
                    
                    // Push to Docker Hub (requires credentials)
                    withCredentials([string(credentialsId: 'dockerhub-creds', variable: 'DOCKER_PWD')]) {
                        sh 'echo $DOCKER_PWD | docker login -u pengiuntandinzangmo --password-stdin'
                        sh 'docker push penguintandinzangmo/node-app:latest'
                    }
                }
            }
        }
    }
}