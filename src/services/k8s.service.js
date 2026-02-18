const { appsApi } = require('../config/k8s.config');

async function scaleDeployment(namespace, name, replicas) {
    console.log("Scaling deployment:", name);

    const patch = {
        spec: {
            replicas: replicas
        }
    };

    await appsApi.patchNamespacedDeployment(
        {
            name: name,
            namespace: namespace,
            body: patch
        }
    );

    console.log(`Scaled ${name} to ${replicas} replicas`);
}

module.exports = { scaleDeployment };
