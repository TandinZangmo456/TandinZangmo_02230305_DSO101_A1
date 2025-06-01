# Assignment I : Integration of CI/CD on To-Do App Deployment

## Step 0: Creating the Todo List Application
 - Created full functional to-do list app with 
    - Frontend: User interface for implementation of CRUD functions.
    - Backend: CRUD API to handle task operations.
    - Database: PostgreSQL database to store data or tasks.

## Part A: Deploying a Pre-Built Docker Image to Docker Hub

Steps Taken:
1. Build and Push Docker Images
Created Dockerfiles for both backend and frontend 

Backend(be-todo)

![alt text](images/1.png)


Frontend(fe-todo)

![alt text](images/2.png)


![alt text](images/3.png)


2. Deploying on Render

Deployed both backend and frontend as a Web Service from existing Docker image.

Backend
 
![alt text](images/4.png)

![alt text](images/5.png)

Frontend

![alt text](images/6.png)

![alt text](images/7.png)

### Conclusion

Successfully built a todo application with react, node.js and postgreSQL. Learned how to use docker for packaging applications. Using Render to deploy and manage services.


# Assignment II: CI/CD Pipeline with Jenkins

Implementation of of a jenkins CI/CD pipeline for build, test and deployment process of node.js from assignment 1.

1. Jenkins Setup

Installed Jenkins and ran on localhost:8080

Installed required plugins:

NodeJS Plugin (for npm)
Pipeline
GitHub Integration
Docker Pipeline


2. NodeJS Configuration in Jenkins
![alt text](images2/2.png)

3. GitHub Repository Integration
![alt text](images2/3.png)
![alt text](images2/4.png)

4. Jenkinsfile Implementation
![alt text](images2/5.png)

5. Pipeline Execution
![alt text](images2/6.png)

![alt text](images2/7.png)

Successful pipeline execution
![alt text](images2/8.png)

DockerHub image
![alt text](images2/9.png)

Image link 
https://hub.docker.com/repository/docker/penguintandinzangmo/node-app/tags/latest/sha256-aa7ed39d4841ef95c4515ba7d5b412b4b0dfab5192a8ee1d30304cfae58fabdd


# Assignment III : CI/CD with GitHub Actions

## GitHub Actions Pipeline Implementation

![alt text](images3/1.png)

## GitHub Secrets Configuration
![alt text](images3/2.png)

## Pipeline Testing and Validation
![alt text](images3/3.png)

## Deployment Verification
![alt text](images3/4.png)
![alt text](images3/5.png)
![alt text](images3/6.png)