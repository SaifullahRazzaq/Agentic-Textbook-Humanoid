/**
 * SkillRegistry.js
 * A collection of modular "skills" (sub-agents) that the chatbot can invoke.
 */

export const SkillRegistry = {
    // Skill: Calculate Torque
    // Usage: /calc torque <force> <length>
    calculateTorque: (args) => {
        const force = parseFloat(args[0]);
        const length = parseFloat(args[1]);
        if (isNaN(force) || isNaN(length)) return "Error: Please provide valid numbers for Force (N) and Length (m).";
        const torque = force * length;
        return `**Torque Calculation**:\nForce: ${force} N\nLength: ${length} m\nResult: **${torque.toFixed(2)} Nm**`;
    },

    // Skill: Simulate PID Controller Response
    // Usage: /sim pid <kp> <ki> <kd>
    simulatePID: (args) => {
        const kp = parseFloat(args[0]) || 1.0;
        const ki = parseFloat(args[1]) || 0.1;
        const kd = parseFloat(args[2]) || 0.05;

        // Mock simulation result
        const overshoot = (kp * 10) + (ki * 5) - (kd * 20);
        const settlingTime = 2.0 - (kp * 0.1) - (kd * 0.2);

        return `**PID Simulation Results**:\nParameters: Kp=${kp}, Ki=${ki}, Kd=${kd}\n- Overshoot: ${Math.max(0, overshoot).toFixed(1)}%\n- Settling Time: ${Math.max(0.1, settlingTime).toFixed(2)}s\n\n*Note: This is a simplified simulation for demonstration.*`;
    },

    // Skill: Unit Conversion
    // Usage: /convert <value> <from_unit> <to_unit>
    convertUnits: (args) => {
        const value = parseFloat(args[0]);
        const from = args[1]?.toLowerCase();
        const to = args[2]?.toLowerCase();

        if (isNaN(value)) return "Error: Invalid value.";

        if (from === 'm' && to === 'cm') return `${value} m = ${value * 100} cm`;
        if (from === 'kg' && to === 'lbs') return `${value} kg = ${(value * 2.20462).toFixed(2)} lbs`;
        if (from === 'rad' && to === 'deg') return `${value} rad = ${(value * 180 / Math.PI).toFixed(2)} deg`;

        return "Conversion not supported yet. Try: m to cm, kg to lbs, rad to deg.";
    }
};

export const executeSkill = (command) => {
    const parts = command.trim().split(' ');
    const skillName = parts[0].replace('/', ''); // remove slash
    const args = parts.slice(1);

    // Map commands to functions
    if (skillName === 'calc' && args[0] === 'torque') {
        return SkillRegistry.calculateTorque(args.slice(1));
    }
    if (skillName === 'sim' && args[0] === 'pid') {
        return SkillRegistry.simulatePID(args.slice(1));
    }
    if (skillName === 'convert') {
        return SkillRegistry.convertUnits(args);
    }

    return null; // No skill found
};
