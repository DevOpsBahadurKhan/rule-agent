import * as k8s from '@kubernetes/client-node';

let appsApi = null;
let coreApi = null;

function initializeK8sClients() {
    try {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        appsApi = kc.makeApiClient(k8s.AppsV1Api);
        coreApi = kc.makeApiClient(k8s.CoreV1Api);
        console.log('Kubernetes config initialized successfully');
    } catch (error) {
        console.warn('Failed to initialize Kubernetes config:', error.message);
        console.warn('Running in non-Kubernetes environment. Some features may not work.');
    }
}

// Initialize on module load
initializeK8sClients();

export { appsApi, coreApi };
