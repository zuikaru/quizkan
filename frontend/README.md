# QuizKan Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The default environment variables and the example can be seen in .env file. It can be overriden by .env.local. For more information, please see [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## Firebase Emulator Setup

1. Download and install Firebase CLI from [here](https://firebase.google.com/docs/cli#install_the_firebase_cli)
2. Run `cd frontend`
3. Run `firebase emulators:start`. Follow the on-screen instructions.
4. Add the following entries to .env.local
    ```
    NEXT_PUBLIC_FIREBASE_ENABLE_EMULATOR=true
    FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
    FIREBASE_ADMIN_PRIVATE_KEY="...secret..."
    ```
5. Run `yarn dev` and open http://localhost:3000 to start playing with Firebase Authentication
6. (Optional) Open http://localhost:4000 to view the emulator web ui.

## PWA Setup

TODO

### Note

To generate a new service worker in development environment, you have to comment out pwa.disable in next.config.js then start the development server and close it.

## Deploying on Kubernetes Cluster

1. Create a secret containing Firebase private key, remove --edit flag if the private key is already in place. **Note: the secret value must be base64 encoded.**

```bash
$ kubectl create --edit -f secret.yaml
```

2. (This step will varies according to your container registry in which the image is located) Create a secret which contains image pull secret. Below is the example of how to create and use image pull secret file. You can find more details at [Kubernetes Documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)

    2.1 Here's an example of config.json found in ~/.docker/. You may generate this file by issuing `docker login <registry-url>`.

    ```json
    {
        "auths": {
            "ghcr.io": {
                "auth": "REDACTED"
            }
        }
    }
    ```

    2.2 Create file named regcred.yaml where .dockerconfigjson is a based64 encoded content of config.json in the step 2.1

    ```yaml
    apiVersion: v1
    data:
        .dockerconfigjson: REDACTED # base64 encoded of the content in config.json
    kind: Secret
    metadata:
        name: regcred
    type: kubernetes.io/dockerconfigjson
    ```

3. Apply deployment by running

```bash
$ kubectl apply -f deployment.yaml
```

4. Expose the deployment by running

```bash
$ kubectl expose deployment quizkan-frontend-deployment --type=LoadBalancer --port=3000
```

5. (Minikube Only) Open another terminal and run the follwing command. Do not close the terminal.

```bash
$ minikube tunnel
```

6. View the service by running.

```bash
$ kubectl get service
```

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
