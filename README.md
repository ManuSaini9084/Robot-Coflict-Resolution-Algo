# Fleet Manager Conflict Resolution

## Overview
The Fleet Manager Conflict Resolution system is designed to manage a group of autonomous mobile robots in a warehouse environment. This system ensures efficient conflict resolution and task management to maintain operational efficiency and avoid delays.

This document provides an overview of the three tasks required for the Software Intern Recruitment process, including detailed explanations, code snippets, and steps to run the solution.

---

## Task 1: Conflict Resolution Case Study

### Scenario
Mobile robots in a warehouse may face conflicts when:
1. Two robots access the same aisle or node simultaneously.
2. One robot delays task completion, disrupting others' schedules.

### Strategy
To prioritize which robot gains access to the common path (aisle), the following factors are considered:
1. **Task Urgency**: Robots with time-critical tasks are given priority.
2. **Proximity**: Robots closer to the conflicting node are prioritized.
3. **Battery Level**: Robots with lower battery levels are prioritized to ensure they complete their tasks before requiring a recharge.


#### Reasoning and Trade-offs
- **Operational Efficiency**: Prioritizing task urgency ensures critical tasks are completed on time.
- **Safety**: Proximity and battery levels ensure robots do not stall in critical areas.
- **Scalability**: The system uses a priority queue to handle increasing numbers of robots efficiently.


---

## Task 2: Algorithm Design

### Problem
When robots are moving along predefined paths, conflicts may arise dynamically as they approach conflicting regions. The goal is to:
1. Detect conflicts dynamically.
2. Resolve conflicts by stopping one robot based on priorities.

### Solution
- Detect conflicts by tracking node occupancy.
- Resolve conflicts using a priority-based algorithm considering task urgency, battery level, and predefined robot priorities.

#### Pseudocode
```python
# Detect conflicts in robot paths
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

# Resolve conflicts dynamically
def resolve_conflicts(conflicts, properties):
    stop_instructions = {}

    for conflict in conflicts:
        node, robots = conflict
        sorted_robots = sorted(robots, key=lambda r: (
            properties[r]["priority"], 
            -properties[r]["task_urgency"], 
            -properties[r]["battery"]))
        for robot in sorted_robots[1:]:
            stop_instructions[robot] = f"Stop before reaching node {node}"

    return stop_instructions
```

#### Steps to Run
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the backend script:
   ```bash
   python main.py
   ```
4. Copy the generated `stop_instructions.json` to the `frontend` directory as `robots.json`.
5. Open `index.html` in the browser to view the simulation.

---

## Task 3: Behavioral Assessment

### Question
**Describe a time you faced a major problem that required out-of-the-box thinking to solve. Relate it to how you would approach challenges in designing a fleet manager for autonomous mobile robots.**

### Response
**Scenario**: While developing an automated data aggregation system, I encountered inconsistent APIs from various sources, causing delays and errors.

#### Steps Taken
1. **Problem Analysis**:
   - Identified the root cause as inconsistent data formats and response times.
   - Prioritized critical data sources.

2. **Solution Design**:
   - Built an intermediate data normalization layer using Python.
   - Implemented retry mechanisms to handle delayed responses.

3. **Tools Used**:
   - Used Flask for building the normalization layer.
   - Integrated logging tools for real-time monitoring.

4. **Outcome**:
   - Reduced data aggregation time by 40%.
   - Improved system reliability and scalability.

#### Application to Fleet Management
- **Adaptability**: The ability to handle inconsistent robot properties or paths mirrors the normalization approach.
- **Real-Time Decision Making**: Conflict resolution requires real-time analysis, similar to handling API delays.
- **Reliability**: Ensures the system functions efficiently under varying conditions.

---

## Directory Structure
```
.
├── backend/
│   ├── main.py
│   ├── robot_paths.json
│   ├── robot_properties.json
│   ├── stop_instructions.json
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── robots.json
└── README.md
```

---

## Commands to Run

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the backend script:
   ```bash
   python main.py
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Open `index.html` in a browser to view the simulation.

---

## Evaluation Criteria
1. **Creative Problem-Solving**: Innovative approaches to conflict resolution.
2. **Analytical Thinking**: Clear reasoning and well-justified decisions.
3. **Collaboration & Communication**: Effective presentation of ideas.
4. **Adaptability**: Flexibility in handling dynamic scenarios.

---

Thank you for reviewing this submission. Feel free to reach out for any clarifications or additional details!
