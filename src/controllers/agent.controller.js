import { evaluateRules } from '../services/rule.engine.js';

async function runAgent(req, res) {
    await evaluateRules();
    res.json({ message: "Rule evaluation completed" });
}

export { runAgent };
