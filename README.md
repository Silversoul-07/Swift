# Swift

This project uses Docker and Docker Compose to set up a containerized environment, allowing you to run the application and its services in isolated containers.

## Prerequisites

- **Docker**: Ensure Docker is installed on your machine.
  - [Docker Installation Guide](https://docs.docker.com/get-docker/)

## Getting Started

Follow the steps below to set up and run the application using Docker.

### 1. Clone the Repository

```bash
git clone https://github.com/Silversoul-07/Swift.git
cd Swift
```

### 2. Build and Run the Docker Containers

Use Docker Compose to build and run the containers.

```bash
docker-compose up --build
```

- `--build`: Forces a rebuild of the images if there are changes in the Dockerfile or other configuration files.


### 3. Stop the containers

To stop the containers use CTRL + c

```bash
ctrl + c
```

### 3. Delete the containers

To remove all stopped containers, networks, and volumes created by `compose up`:

```bash
docker-compose down --volumes
```

### 4. Accessing the Application

Once the containers are up, you can access your application by navigating to [http://localhost:3000](http://localhost:3000) in your browser.