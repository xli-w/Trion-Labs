export const navigationItems = Object.freeze([
  { id: "overview", label: "Overview" },
  { id: "challenges", label: "Challenges" },
  { id: "capabilities", label: "Capabilities" },
  { id: "performance", label: "Performance" },
]);

export const kpiDefinitions = Object.freeze({
  throughput: {
    label: "Throughput",
    description: "How much the operation produces.",
  },
  quality: {
    label: "Quality",
    description: "How much is produced right first time.",
  },
  delivery: {
    label: "Delivery",
    description: "Whether orders are fulfilled on time.",
  },
  productivity: {
    label: "Productivity",
    description: "How efficiently people and resources are used.",
  },
  visibility: {
    label: "Visibility",
    description: "How clearly the operation can be understood.",
  },
  cost: {
    label: "Cost",
    description: "The resources consumed to achieve the result.",
  },
});

export const initialKpis = Object.freeze({
  throughput: { current: 58, previous: 58, target: 78, unit: "%" },
  quality: { current: 72, previous: 72, target: 88, unit: "%" },
  delivery: { current: 64, previous: 64, target: 86, unit: "%" },
  productivity: { current: 55, previous: 55, target: 76, unit: "%" },
  visibility: { current: 35, previous: 35, target: 80, unit: "%" },
  cost: { current: 68, previous: 68, target: 82, unit: "%" },
});

export const capabilityStages = Object.freeze([
  {
    stage: 1,
    name: "Fragmented",
    description: "Information is scattered. Problems are difficult to see.",
  },
  {
    stage: 2,
    name: "Visible",
    description: "Processes and KPIs become clearer.",
  },
  {
    stage: 3,
    name: "Connected",
    description: "Systems and information begin working together.",
  },
  {
    stage: 4,
    name: "Responsive",
    description: "People can act faster because information flows where it is needed.",
  },
  {
    stage: 5,
    name: "Improving",
    description: "The operation can measure, learn, and continuously improve.",
  },
]);

export const operationAreas = Object.freeze([
  {
    id: "production",
    label: "Production",
    detail: "Line events and process time",
    activeAt: 1,
  },
  {
    id: "quality",
    label: "Quality",
    detail: "Defects and first-time-right data",
    activeAt: 2,
  },
  {
    id: "logistics",
    label: "Logistics",
    detail: "Material and delivery dependencies",
    activeAt: 3,
  },
  {
    id: "planning",
    label: "Planning",
    detail: "Capacity, orders, and constraints",
    activeAt: 3,
  },
  {
    id: "people",
    label: "People",
    detail: "Decisions, handoffs, and work",
    activeAt: 1,
  },
  {
    id: "systems",
    label: "Systems",
    detail: "Shared operational context",
    activeAt: 2,
  },
]);

export const challenges = Object.freeze([
  {
    id: "missing-minutes",
    number: "01",
    title: "The Missing Minutes",
    story:
      "A production line is missing its target. It appears to be running, but time is being lost in several places.",
    objective: "Find the largest avoidable loss before choosing how to improve the line.",
    mechanic: "Timeline investigation",
    focus: ["Running time", "Minor stops", "Changeover", "Material delay"],
    principle: "Understand the process before trying to improve it.",
    unlockId: "connected-production-view",
    unlockLabel: "Connected Production View",
    prerequisites: [],
  },
  {
    id: "quality-loop",
    number: "02",
    title: "The Quality Loop",
    story:
      "Defects are increasing, but nobody agrees why. Production, quality, and process information are disconnected.",
    objective: "Connect the evidence that reveals the most likely source of the repeat defects.",
    mechanic: "Information connection",
    focus: ["Production conditions", "Quality results", "Machine status", "Material batch"],
    principle: "Data becomes useful when it is connected to the process that creates it.",
    unlockId: "production-quality-integration",
    unlockLabel: "Production + Quality Integration",
    prerequisites: ["missing-minutes"],
  },
  {
    id: "spreadsheet-shuffle",
    number: "03",
    title: "The Spreadsheet Shuffle",
    story:
      "A planner spends the morning reconciling spreadsheets, copying updates, and emailing information between systems.",
    objective: "Remove duplicate effort before deciding which part of the workflow should be automated.",
    mechanic: "Workflow redesign",
    focus: ["Manual copy", "Duplicate checks", "Information sources", "Handoffs"],
    principle: "Simplify the work before adding more technology.",
    unlockId: "workflow-automation",
    unlockLabel: "Workflow Automation",
    prerequisites: ["quality-loop"],
  },
  {
    id: "delivery-domino",
    number: "04",
    title: "The Delivery Domino",
    story:
      "A late material delivery threatens several customer orders. The problem crosses logistics, production, planning, and delivery.",
    objective: "Trace the consequence of the delay and intervene where it prevents the most disruption.",
    mechanic: "Dependency tracing",
    focus: ["Material status", "Affected orders", "Production constraints", "Exception timing"],
    principle: "Connected information makes problems visible earlier.",
    unlockId: "logistics-production-visibility",
    unlockLabel: "Logistics + Production Visibility",
    prerequisites: ["spreadsheet-shuffle"],
  },
  {
    id: "control-room",
    number: "05",
    title: "The Control Room",
    story:
      "Management has plenty of data but no clear operational view. Important signals compete with distracting information.",
    objective: "Build a useful view by selecting the information that supports the next operational decision.",
    mechanic: "Dashboard composition",
    focus: ["Role-relevant KPIs", "Live operational data", "Exceptions", "Decision context"],
    principle: "The right information, presented to the right people, enables better decisions.",
    unlockId: "central-operational-view",
    unlockLabel: "Central Operational View",
    prerequisites: ["delivery-domino"],
  },
  {
    id: "improvement-challenge",
    number: "06",
    title: "The Improvement Challenge",
    story:
      "The operation has improved, but gains need to be sustained. Another bottleneck is already becoming visible.",
    objective: "Choose the next improvement by weighing impact, effort, risk, data quality, and readiness.",
    mechanic: "Opportunity prioritisation",
    focus: ["Impact", "Effort", "Risk", "Data quality"],
    principle: "Transformation is iterative, measurable, and continuous.",
    unlockId: "continuous-improvement",
    unlockLabel: "Continuous Improvement",
    prerequisites: ["control-room"],
  },
]);

export const upgrades = Object.freeze([
  {
    id: "understand",
    type: "Method",
    title: "Understand",
    description: "Reveal the real process, data, and dependencies.",
  },
  {
    id: "simplify",
    type: "Method",
    title: "Simplify",
    description: "Remove unnecessary steps, duplication, and friction.",
  },
  {
    id: "standardise",
    type: "Method",
    title: "Standardise",
    description: "Create consistent ways of working and recording information.",
  },
  {
    id: "automate",
    type: "Method",
    title: "Automate",
    description: "Remove repetitive work and improve information flow.",
  },
  {
    id: "measure",
    type: "Method",
    title: "Measure",
    description: "Track what matters and make the next improvement visible.",
  },
  {
    id: "connected-production-view",
    type: "Connection",
    title: "Connected Production View",
    description: "Production events become a shared operational signal.",
  },
  {
    id: "production-quality-integration",
    type: "Connection",
    title: "Production + Quality",
    description: "Quality results can be understood in production context.",
  },
  {
    id: "workflow-automation",
    type: "Connection",
    title: "Workflow Automation",
    description: "Routine updates move through a clear, reliable flow.",
  },
  {
    id: "logistics-production-visibility",
    type: "Connection",
    title: "Logistics + Production",
    description: "Material risk is visible before it disrupts the schedule.",
  },
  {
    id: "central-operational-view",
    type: "Connection",
    title: "Central Operational View",
    description: "Relevant people can act from one shared view of work.",
  },
  {
    id: "continuous-improvement",
    type: "Connection",
    title: "Continuous Improvement",
    description: "The operation can measure, learn, and improve again.",
  },
]);

const scoreWeights = Object.freeze({
  throughput: 0.2,
  quality: 0.2,
  delivery: 0.2,
  productivity: 0.15,
  visibility: 0.15,
  cost: 0.1,
});

export function calculateOperationalScore(kpis) {
  const score = Object.entries(scoreWeights).reduce(
    (total, [key, weight]) => total + kpis[key].current * weight,
    0,
  );

  return Math.round(score);
}

export function getChallengeById(challengeId) {
  return challenges.find((challenge) => challenge.id === challengeId);
}

export function getUpgradeById(upgradeId) {
  return upgrades.find((upgrade) => upgrade.id === upgradeId);
}

export function getCapabilityStage(stageNumber) {
  return capabilityStages.find((stage) => stage.stage === stageNumber) ?? capabilityStages[0];
}

function cloneInitialKpis() {
  return Object.fromEntries(
    Object.entries(initialKpis).map(([key, value]) => [key, { ...value }]),
  );
}

export function createInitialGameState() {
  const kpis = cloneInitialKpis();

  return {
    currentScreen: "landing",
    activeSection: "overview",
    activeChallengeId: null,
    completedChallenges: [],
    unlockedUpgrades: [],
    operationalScore: calculateOperationalScore(kpis),
    capabilityStage: 1,
    kpis,
    resources: {
      improvementCapacity: 3,
      integrationCapacity: 2,
    },
    decisions: [],
    notifications: [],
    announcement: "Welcome to Trion Labs.",
  };
}
