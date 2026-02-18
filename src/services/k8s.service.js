import { appsApi } from '../config/k8s.config.js';

async function scaleDeployment(namespace, name, replicas) {
    console.log("Scaling deployment:", name, "in namespace:", namespace, "to replicas:", replicas);

    if (!appsApi) {
        console.warn('appsApi not initialized; skipping scale operation');
        return;
    }

    if (!name || typeof name !== 'string') {
        console.error('Invalid deployment name:', name, '(%s)', typeof name);
        throw new Error('Invalid deployment name');
    }

    if (!namespace || typeof namespace !== 'string') {
        console.error('Invalid namespace:', namespace, '(%s)', typeof namespace);
        throw new Error('Invalid namespace');
    }

    const patch = {
        spec: {
            replicas: replicas
        }
    };

    try {
        // Prefer the standard param order: name, namespace, body
        if (typeof appsApi.patchNamespacedDeployment === 'function') {
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
        } else if (typeof appsApi.patchNamespacedDeploymentWithHttpInfo === 'function') {
            // Fallback for some client versions
            await appsApi.patchNamespacedDeploymentWithHttpInfo(
                name,
                namespace,
                patch,
                undefined,
                undefined,
                undefined,
                undefined,
                { headers: { 'Content-Type': 'application/merge-patch+json' } }
            );
        } else {
            // Last resort: try object param signature
            await appsApi.patchNamespacedDeployment({ name, namespace, body: patch });
        }

        console.log(`Scaled ${name} to ${replicas} replicas`);
    } catch (err) {
        console.error('Failed to scale deployment:', err && err.message ? err.message : err);
        console.error('Diagnostics: name=%o, namespace=%o, appsApiMethods=%o', name, namespace, Object.keys(appsApi || {}));
        throw err;
    }
}

export { scaleDeployment };
