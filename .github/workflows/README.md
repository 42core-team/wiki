# Kubernetes Deployment Workflow

This workflow automates the process of building a Docker image for the public-wiki application, pushing it to the GitHub Container Registry (ghcr.io), and deploying it to a Kubernetes cluster.

## How it Works

The workflow is defined in `deploy.yml` and consists of two main jobs:

1. **`build-and-push`**: This job is responsible for:
    * Checking out the repository's code.
    * Logging into the GitHub Container Registry.
    * Building the Docker image using the `Dockerfile` in the root of the project.
    * Pushing the built image to the GitHub Container Registry, tagged with the Git SHA of the commit.

2. **`deploy`**: This job depends on the successful completion of `build-and-push` and is responsible for:
    * Checking out the repository's code.
    * Setting up `kubectl` with the credentials to access your Kubernetes cluster.
    * Updating the `k8s/deployment.yml` to use the newly built Docker image.
    * Applying the Kubernetes manifests (`deployment.yml`, `service.yml`, and `ingress.yml`) located in the `k8s/` directory to the cluster.

## Triggers

The workflow is automatically triggered on any `push` event to the following branches:

* `main`
* `dev`

## Prerequisites

Before this workflow can run successfully, you must configure a secret in your GitHub repository.

### `KUBE_CONFIG_DATA`

This secret is required for the `deploy` job to authenticate with your Kubernetes cluster. It should contain the base64-encoded content of your `kubeconfig` file.

To create this secret:

1. Go to your GitHub repository's **Settings**.
2. Navigate to **Secrets and variables** > **Actions**.
3. Click on **New repository secret**.
4. Name the secret `KUBE_CONFIG_DATA`.
5. For the value, you need to provide the base64-encoded version of your `kubeconfig` file. You can get this by running the following command in your terminal:

    ```bash
    cat ~/.kube/config | base64
    ```

    If you are on Windows using PowerShell, you can use:

    ```powershell
    [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$env:USERPROFILE\.kube\config"))
    ```

6. Copy the output of the command and paste it into the "Value" field of the secret.
7. Click **Add secret**.

Once the secret is configured, the workflow will be able to deploy your application to your Kubernetes cluster whenever you push changes to the `main` or `dev` branches.
