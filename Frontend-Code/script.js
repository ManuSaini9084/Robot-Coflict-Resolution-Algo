const nodes = {
    1: { x: 50, y: 50 }, 2: { x: 150, y: 50 }, 3: { x: 250, y: 50 }, 4: { x: 350, y: 50 }, 5: { x: 450, y: 50 },
    6: { x: 50, y: 150 }, 7: { x: 150, y: 150 }, 8: { x: 250, y: 150 }, 9: { x: 350, y: 150 }, 10: { x: 450, y: 150 }
};

const paths = {
    robotA: [1, 2, 3, 4, 5],
    robotB: [6, 7, 3, 8, 9]
};

const stopInstructions = {
    robotB: "Stop before reaching node 3"
};

function createNodes() {
    const simulation = document.getElementById("simulation");
    for (let id in nodes) {
        const node = document.createElement("div");
        node.className = "node";
        node.style.left = `${nodes[id].x}px`;
        node.style.top = `${nodes[id].y}px`;
        simulation.appendChild(node);
    }
}

function startSimulation() {
    const simulation = document.getElementById("simulation");
    const robots = {};

    for (let robot in paths) {
        const robotDiv = document.createElement("div");
        robotDiv.className = `robot ${robot.toLowerCase()}`;
        robotDiv.style.left = `${nodes[paths[robot][0]].x}px`;
        robotDiv.style.top = `${nodes[paths[robot][0]].y}px`;
        robots[robot] = { div: robotDiv, path: paths[robot], index: 1 };
        simulation.appendChild(robotDiv);
    }

    function moveRobots() {
        let robotsStillMoving = false;

        for (let robot in robots) {
            const { div, path, index } = robots[robot];
            if (index >= path.length) continue;

            const nextNode = path[index];
            const stopNode = stopInstructions[robot]
                ? parseInt(stopInstructions[robot].match(/\d+/)[0])
                : null;

            if (stopNode === nextNode) {
                console.log(`${robot} stops at node ${nextNode}`);
                continue;
            }

            div.style.left = `${nodes[nextNode].x}px`;
            div.style.top = `${nodes[nextNode].y}px`;
            robots[robot].index++;
            robotsStillMoving = true;
        }

        if (robotsStillMoving) setTimeout(moveRobots, 1000);
    }

    moveRobots();
}

createNodes();
startSimulation();
