import { appsApi } from '../config/k8s.config.js';

async function scaleDeployment(namespace, name, replicas) {
    console.log("Scaling deployment:", name);

    if (!appsApi) {
        console.warn('appsApi not initialized; skipping scale operation');
        return;
    }

    const patch = {
        spec: {
            replicas: replicas
        }
    };

    try {
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
    } catch (err) {
        console.error('Failed to scale deployment:', err && err.message ? err.message : err);
        throw err;
    }
}

export { scaleDeployment };
