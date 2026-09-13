import { createInitialMissingMinutesState } from "./miniGames/missingMinutes.js";
import { createInitialQualityLoopState } from "./miniGames/qualityLoop.js";
import { createInitialSpreadsheetShuffleState } from "./miniGames/spreadsheetShuffle.js";
import { createInitialDeliveryDominoState } from "./miniGames/deliveryDomino.js";
import { createInitialControlRoomState } from "./miniGames/controlRoom.js";
import { initialKpis, kpiDefinitions } from "./operationModel.js";

export { initialKpis, kpiDefinitions };

export const navigationItems = Object.freeze([
  { id: "overview", label: "Overview" },
  { id: "challenges", label: "Challenges" },
  { id: "capabilities", label: "Capabilities" },
  { id: "performance", label: "Performance" },
]);

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

export const challenges = Object.freeze([
  {
    id: "missing-minutes",
    number: "01",
    title: "The Missing Minutes",
    phase: "Understand",
    journeySummary: "Make lost time visible before trying to improve it.",
    shortDescription: "Make hidden production loss traceable.",
    operationalProblem:
      "Inconsistent downtime records hide the reason for lost production time and delay the next response.",
    story:
      "A production line is missing its target. It appears to be running, but time is being lost in several places.",
    objective: "Find the largest avoidable loss before choosing how to improve the line.",
    mechanic: "Timeline investigation",
    focus: ["Running time", "Minor stops", "Changeover", "Material delay"],
    principle: "Understand the process before trying to improve it.",
    methodologyIds: Object.freeze(["understand"]),
    frictionPointIds: Object.freeze(["incomplete-downtime-context"]),
    operationalAreaIds: Object.freeze(["production", "maintenance"]),
    connectionIds: Object.freeze(["production-event-context"]),
    kpiKeys: Object.freeze(["throughput", "productivity", "visibility"]),
    outcomeId: "missing-minutes-outcome",
    unlockId: "connected-production-view",
    unlockLabel: "Connected Production View",
    prerequisites: [],
  },
  {
    id: "quality-loop",
    number: "02",
    title: "The Quality Loop",
    phase: "Connect",
    journeySummary: "Link the quality signal to the production context that created it.",
    shortDescription: "Connect quality evidence to its production context.",
    operationalProblem:
      "Disconnected quality, production, and material records make recurring defect causes difficult to isolate.",
    story:
      "Defects are increasing, but nobody agrees why. Production, quality, and process information are disconnected.",
    objective: "Connect the evidence that reveals the most likely source of the repeat defects.",
    mechanic: "Information connection",
    focus: ["Production conditions", "Quality results", "Machine status", "Material batch"],
    principle: "Data becomes useful when it is connected to the process that creates it.",
    methodologyIds: Object.freeze(["connect"]),
    frictionPointIds: Object.freeze(["disconnected-production-quality-records"]),
    operationalAreaIds: Object.freeze(["production", "quality"]),
    connectionIds: Object.freeze(["production-quality-context"]),
    kpiKeys: Object.freeze(["quality", "visibility", "productivity"]),
    outcomeId: "quality-loop-outcome",
    unlockId: "production-quality-integration",
    unlockLabel: "Production + Quality Integration",
    prerequisites: ["missing-minutes"],
  },
  {
    id: "spreadsheet-shuffle",
    number: "03",
    title: "The Spreadsheet Shuffle",
    phase: "Simplify and automate",
    journeySummary: "Remove repeated work before automating one reliable planning flow.",
    shortDescription: "Remove duplicate planning work before automating it.",
    operationalProblem:
      "Copied spreadsheet updates and manual reconciliation delay a reliable planning response.",
    story:
      "A planner spends the morning reconciling spreadsheets, copying updates, and emailing information between systems.",
    objective: "Remove duplicate effort before deciding which part of the workflow should be automated.",
    mechanic: "Workflow redesign",
    focus: ["Manual copy", "Duplicate checks", "Information sources", "Handoffs"],
    principle: "Do not automate confusion. Simplify and standardise the work before adding technology.",
    methodologyIds: Object.freeze(["simplify", "standardise", "automate"]),
    frictionPointIds: Object.freeze(["duplicated-planning-workflow"]),
    operationalAreaIds: Object.freeze(["production", "planning"]),
    connectionIds: Object.freeze(["planning-erp-context"]),
    kpiKeys: Object.freeze(["productivity", "visibility", "cost", "delivery"]),
    outcomeId: "spreadsheet-shuffle-outcome",
    unlockId: "workflow-automation",
    unlockLabel: "Workflow Automation",
    prerequisites: ["quality-loop"],
  },
  {
    id: "delivery-domino",
    number: "04",
    title: "The Delivery Domino",
    phase: "Coordinate dependencies",
    journeySummary: "Trace one disruption across the operation so people can act before it spreads.",
    shortDescription: "Trace material risk before it reaches customer commitments.",
    operationalProblem:
      "A supplier delay does not reach planning, production, and delivery early enough to protect the response.",
    story:
      "A late material delivery threatens several customer orders. The problem crosses logistics, production, planning, and delivery.",
    objective: "Trace the consequence of the delay and intervene where it prevents the most disruption.",
    mechanic: "Dependency tracing",
    focus: ["Material status", "Affected orders", "Production constraints", "Exception timing"],
    principle: "Connected information makes problems visible earlier.",
    methodologyIds: Object.freeze(["connect"]),
    frictionPointIds: Object.freeze(["late-material-risk-visibility"]),
    operationalAreaIds: Object.freeze(["logistics", "planning", "production", "management"]),
    connectionIds: Object.freeze(["material-risk-response"]),
    kpiKeys: Object.freeze(["delivery", "visibility", "throughput"]),
    outcomeId: "delivery-domino-outcome",
    unlockId: "logistics-production-visibility",
    unlockLabel: "Logistics + Production Visibility",
    prerequisites: ["spreadsheet-shuffle"],
  },
  {
    id: "control-room",
    number: "05",
    title: "The Control Room",
    phase: "Measure and improve",
    journeySummary: "Focus shared information on the people who need to make the next decision.",
    shortDescription: "Focus one shared exception on the people who can act.",
    operationalProblem:
      "Separate reports obscure the material, work, and delivery relationship needed for a coordinated decision.",
    story:
      "Management has plenty of data but no clear operational view. Important signals compete with distracting information.",
    objective: "Build a useful view by selecting the information that supports the next operational decision.",
    mechanic: "Dashboard composition",
    focus: ["Role-relevant KPIs", "Current operational signals", "Exceptions", "Decision context"],
    principle: "The right information, presented to the right people, enables better decisions.",
    methodologyIds: Object.freeze(["measure"]),
    frictionPointIds: Object.freeze(["unfocused-operational-exception-view"]),
    operationalAreaIds: Object.freeze(["management", "planning", "production"]),
    connectionIds: Object.freeze([
      "shared-decision-context",
      "decision-to-outcome",
    ]),
    kpiKeys: Object.freeze(["visibility", "productivity", "delivery", "throughput"]),
    outcomeId: "control-room-outcome",
    unlockId: "central-operational-view",
    unlockLabel: "Central Operational View",
    prerequisites: ["delivery-domino"],
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
    id: "connect",
    type: "Method",
    title: "Connect",
    description: "Relate information around the decision people need to make.",
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
    title: "Production + Quality Integration",
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
    title: "Logistics + Production Visibility",
    description: "Material risk is visible before it disrupts the schedule.",
  },
  {
    id: "central-operational-view",
    type: "Connection",
    title: "Central Operational View",
    description: "Relevant people can act from one shared view of work.",
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

export function hasCompletedExperience(completedChallenges) {
  return challenges.every((challenge) => completedChallenges.includes(challenge.id));
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
    missingMinutes: createInitialMissingMinutesState(),
    qualityLoop: createInitialQualityLoopState(),
    spreadsheetShuffle: createInitialSpreadsheetShuffleState(),
    deliveryDomino: createInitialDeliveryDominoState(),
    controlRoom: createInitialControlRoomState(),
    decisions: [],
    selectedOpportunityId: null,
    notifications: [],
    nextNotificationId: 0,
    announcement: "Welcome to Trion Labs.",
  };
}
