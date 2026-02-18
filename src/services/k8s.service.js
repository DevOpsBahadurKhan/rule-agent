import { appsApi } from '../config/k8s.config.js';

async function scaleDeployment(namespace, name, replicas) {
    const patch = {
        spec: {
            replicas: replicas
        }
    };

    await appsApi.patchNamespacedDeployment(
        name,
        namespace,
        patch,
        undefined,
        undefined,
        undefined,
        undefined,
        { headers: { 'Content-Type': 'application/merge-patch+json' } }
    );

    console.log(`Scaled ${name} to ${replicas} replicas`);
}

export { scaleDeployment };
