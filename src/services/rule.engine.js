import { getCpuUsage } from './monitor.service.js';
import { scaleDeployment } from './k8s.service.js';

async function evaluateRules() {
    const cpu = await getCpuUsage();
    console.log("Current CPU:", cpu);

    if (cpu > 80) {
        console.log("CPU spike detected. Scaling...");
        await scaleDeployment("default", "nginx-deployment", 3);
    } else {
        console.log("CPU normal.");
    }
}

export { evaluateRules };
