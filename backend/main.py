import json

# Load robot paths
robot_paths = {
    "robotA": [1, 2, 3, 4, 5],
    "robotB": [6, 7, 3, 8, 9]
}

# Define robot properties
robot_properties = {
    "robotA": {"priority": 1, "task_urgency": 5, "battery": 80},
    "robotB": {"priority": 2, "task_urgency": 8, "battery": 60}
}

# Function to detect conflicts dynamically
def detect_conflicts(paths):
    node_occupancy = {}
    conflicts = []

    for robot, path in paths.items():
        for node in path:
            if node not in node_occupancy:
                node_occupancy[node] = []
            node_occupancy[node].append(robot)

    for node, robots in node_occupancy.items():
        if len(robots) > 1:
            conflicts.append((node, robots))

    return conflicts

# Function to resolve conflicts
def resolve_conflicts(conflicts, properties):
    stop_instructions = {}

    for conflict in conflicts:
        node, robots = conflict
        sorted_robots = sorted(
            robots,
            key=lambda r: (
                properties[r]["priority"],
                -properties[r]["task_urgency"],
                -properties[r]["battery"]
            )
        )
        # Stop all robots except the highest-priority one
        for robot in sorted_robots[1:]:
            stop_instructions[robot] = f"Stop before reaching node {node}"

    return stop_instructions

# Detect and resolve conflicts
conflicts = detect_conflicts(robot_paths)
stop_instructions = resolve_conflicts(conflicts, robot_properties)

# Save stop instructions to JSON
with open("stop_instructions.json", "w") as f:
    json.dump(stop_instructions, f, indent=4)

print("Conflicts resolved. Stop instructions saved to 'stop_instructions.json'.")
