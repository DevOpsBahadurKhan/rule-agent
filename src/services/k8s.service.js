import { appsApi } from '../config/k8s.config.js';

export async function scaleDeployment(namespace, name, replicas) {
    console.log(`Scaling deployment: ${name} in namespace: ${namespace} to replicas: ${replicas}`);

    try {
        const scaleBody = {
            apiVersion: "autoscaling/v1",
            kind: "Scale",
            metadata: {
                name: name,
                namespace: namespace
            },
            spec: {
                replicas: replicas
            }
        };

        await appsApi.replaceNamespacedDeploymentScale({
            name: name,
            namespace: namespace,
            body: scaleBody
        });

        console.log(`Successfully scaled ${name} to ${replicas}`);

    } catch (err) {
        console.error("Failed to scale deployment:", err.body || err.message);
    }
}
