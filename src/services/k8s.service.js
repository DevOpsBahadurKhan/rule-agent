import { appsApi } from '../config/k8s.config.js';

export async function scaleDeployment(namespace, name, replicas) {
    console.log(`Scaling deployment: ${name} in namespace: ${namespace} to replicas: ${replicas}`);

    if (!appsApi) {
        console.warn('appsApi not initialized');
        return;
    }

    const body = {
        spec: {
            replicas: replicas
        }
    };

    try {
        await appsApi.patchNamespacedDeployment({
            name: name,
            namespace: namespace,
            body: body,
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        });

        console.log(`Successfully scaled ${name} to ${replicas}`);
    } catch (err) {
        console.error("Failed to scale deployment:", err.message);
    }
}
