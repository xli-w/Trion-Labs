import { getChallengeDecisionDetails } from "../operationModel.js";

export const qualityLoopChallengeId = "quality-loop";

function createQualityLoopDecision(definition) {
  return Object.freeze({
    ...definition,
    ...getChallengeDecisionDetails(qualityLoopChallengeId, definition.id),
  });
}

export const qualityLoopNodes = Object.freeze([
  Object.freeze({
    id: "quality-results",
    label: "Quality results",
    type: "Defect evidence",
    signal: "12% seam defects",
    detail: "18 samples failed after 14:10.",
  }),
  Object.freeze({
    id: "production-conditions",
    label: "Production conditions",
    type: "Run record",
    signal: "Line 03 / Job 584",
    detail: "Affected output begins in the afternoon run.",
  }),
  Object.freeze({
    id: "machine-status",
    label: "Machine status",
    type: "Equipment trace",
    signal: "Tension reset 14:15",
    detail: "A setting changed, then returned to its standard range.",
  }),
  Object.freeze({
    id: "shift-information",
    label: "Shift information",
    type: "People context",
    signal: "Shift B starts 14:00",
    detail: "The spike is visible during the afternoon handover.",
  }),
  Object.freeze({
    id: "material-batch",
    label: "Material batch",
    type: "Material trace",
    signal: "Batch MB-482",
    detail: "The same batch appears in every affected production record.",
  }),
  Object.freeze({
    id: "process-parameters",
    label: "Process parameters",
    type: "Operating range",
    signal: "Speed and heat in range",
    detail: "The standard process window was maintained.",
  }),
]);

export const qualityLoopConnections = Object.freeze([
  Object.freeze({
    id: "quality-production",
    nodeIds: Object.freeze(["quality-results", "production-conditions"]),
    title: "Defects align with the afternoon production run.",
    signal: "The seam-defect spike begins 10 minutes into Job 584 on Line 03.",
    detail:
      "Quality results now point to the production record that created the affected output.",
    isLead: true,
    mapPath: "M 30 25 C 35 17, 42 17, 47 25",
    announcement:
      "Production conditions and quality results are connected. The defect spike begins during Job 584 on Line 03.",
  }),
  Object.freeze({
    id: "production-material",
    nodeIds: Object.freeze(["production-conditions", "material-batch"]),
    title: "Affected output uses one material batch.",
    signal: "Every affected production record for Job 584 uses batch MB-482.",
    detail:
      "The material trace follows the production run, rather than stopping at a separate receiving record.",
    isLead: true,
    mapPath: "M 50 38 C 56 47, 44 53, 50 62",
    announcement:
      "Production conditions and the material trace are connected. Batch MB-482 appears throughout the affected run.",
  }),
  Object.freeze({
    id: "quality-material",
    nodeIds: Object.freeze(["quality-results", "material-batch"]),
    title: "Batch MB-482 carries the strongest defect signal.",
    signal: "Samples linked to MB-482 show 12% seam defects, against a 2% normal rate.",
    detail:
      "The defect pattern follows the material batch across the records, making it the strongest source to investigate.",
    isLead: true,
    mapPath: "M 28 38 C 34 48, 39 54, 47 62",
    announcement:
      "Quality results and the material trace are connected. Batch MB-482 carries the strongest defect signal.",
  }),
  Object.freeze({
    id: "quality-shift",
    nodeIds: Object.freeze(["quality-results", "shift-information"]),
    title: "The shift gives timing, not a source.",
    signal: "The defect spike is visible after the Shift B handover.",
    detail:
      "Shift information narrows when the issue became visible, but it does not explain why the same material-linked samples fail.",
    isLead: false,
    mapPath: "M 17 38 L 17 62",
    announcement:
      "Quality results and shift information are connected. The handover gives useful timing context, not the likely source.",
  }),
  Object.freeze({
    id: "machine-process",
    nodeIds: Object.freeze(["machine-status", "process-parameters"]),
    title: "The machine change is a plausible but incomplete lead.",
    signal: "Tension returned to range at 14:15, while the defect rate remained elevated.",
    detail:
      "Machine context should stay in the investigation, but the timing does not account for the continuing material-linked defects.",
    isLead: false,
    mapPath: "M 83 38 L 83 62",
    announcement:
      "Machine status and process parameters are connected. The setting changed, but the continued defect pattern needs a stronger explanation.",
  }),
]);

export const qualityLoopDiagnoses = Object.freeze([
  Object.freeze({
    id: "machine-setting",
    title: "The machine setting caused the defect spike.",
    description:
      "The tension setting changed shortly before the first failed samples appeared.",
    isLikelyCause: false,
    outcomeTitle: "The timing is real, but it does not explain the pattern.",
    outcomeSummary:
      "The tension setting returned to range while seam defects stayed elevated. The material-linked samples provide stronger evidence than timing alone.",
    outcomeDetail:
      "Keep the machine trace in the case, but use the connected quality and material records to identify the most likely source.",
    announcement:
      "Machine timing is useful context, but it does not explain why the defect rate remained high after the setting returned to range.",
  }),
  Object.freeze({
    id: "material-batch",
    title: "Material batch MB-482 is the most likely source.",
    description:
      "The affected production records and failed samples share the same batch trace.",
    isLikelyCause: true,
    outcomeTitle: "The material trace explains the repeat defect pattern.",
    outcomeSummary:
      "The defect spike is concentrated around batch MB-482. Connecting production and quality information makes that relationship visible.",
    outcomeDetail:
      "The team can isolate the batch, investigate it with the supplier, and keep the machine evidence available as supporting context.",
    announcement:
      "The material-batch hypothesis is supported. MB-482 links the affected production records to the highest defect rate.",
  }),
  Object.freeze({
    id: "shift-handover",
    title: "The Shift B handover is the source.",
    description:
      "The defect spike first appears after the afternoon shift begins.",
    isLikelyCause: false,
    outcomeTitle: "The handover marks the timing, not the likely source.",
    outcomeSummary:
      "Shift B provides a useful point in time, but the defect signal follows MB-482 through the production and quality records.",
    outcomeDetail:
      "Use shift information to coordinate the response, not to replace the evidence that distinguishes one material batch from another.",
    announcement:
      "The shift handover helps locate the issue in time, but the connected material trace provides the stronger explanation.",
  }),
]);

export const qualityLoopDecisions = Object.freeze([
  createQualityLoopDecision({
    id: "connect-production-quality-data",
    title: "Connect production and quality data",
    description:
      "Give every quality result the production run, material batch, machine, and shift context that created it.",
    effectLabel: "Makes recurring defects traceable at the source.",
    completesChallenge: true,
  }),
  createQualityLoopDecision({
    id: "standardise-quality-recording",
    title: "Standardise quality recording",
    description:
      "Use consistent defect categories and checks within the quality record.",
    effectLabel: "Improves consistency, but leaves the source records separate.",
    completesChallenge: false,
    outcomeTitle: "The quality record is clearer, but it remains isolated.",
    outcomeSummary:
      "Standard categories make defect results easier to compare. They still do not show which run, batch, or machine conditions produced the failures.",
    outcomeDetail:
      "Standardisation becomes more useful once the records carry the production context needed to act on the comparison.",
    announcement:
      "Quality recording is more consistent, but the production and material context remains disconnected.",
  }),
  createQualityLoopDecision({
    id: "create-quality-dashboard",
    title: "Create a quality visibility dashboard",
    description:
      "Make defect counts more visible to the teams reviewing quality performance.",
    effectLabel: "Shares the signal, but not the evidence needed to explain it.",
    completesChallenge: false,
    outcomeTitle: "More people can see the defect rate, but not its source.",
    outcomeSummary:
      "A dashboard makes the spike easier to notice. Without the linked production and material records, the team still cannot distinguish timing from cause.",
    outcomeDetail:
      "A shared view becomes valuable after it brings together the evidence required for the next decision.",
    announcement:
      "The defect rate is more widely visible, but the disconnected evidence still cannot point the team to its source.",
  }),
]);

export function createInitialQualityLoopState() {
  return {
    selectedNodeId: null,
    revealedConnectionIds: [],
    lastConnectionId: null,
    connectionError: null,
    diagnosisId: null,
    diagnosisError: null,
    improvementId: null,
    decisionError: null,
  };
}

export function getQualityLoopNodeById(nodeId) {
  return qualityLoopNodes.find((node) => node.id === nodeId);
}

export function getQualityLoopConnectionById(connectionId) {
  return qualityLoopConnections.find((connection) => connection.id === connectionId);
}

export function getQualityLoopConnectionByNodeIds(firstNodeId, secondNodeId) {
  return qualityLoopConnections.find(
    (connection) =>
      connection.nodeIds.includes(firstNodeId) && connection.nodeIds.includes(secondNodeId),
  );
}

export function getQualityLoopDiagnosisById(diagnosisId) {
  return qualityLoopDiagnoses.find((diagnosis) => diagnosis.id === diagnosisId);
}

export function getQualityLoopDecisionById(decisionId) {
  return qualityLoopDecisions.find((decision) => decision.id === decisionId);
}

export function getQualityLoopInvestigationStatus(progress) {
  const revealedConnectionIds = new Set(progress.revealedConnectionIds);
  const leadConnections = qualityLoopConnections.filter(
    (connection) => connection.isLead && revealedConnectionIds.has(connection.id),
  );
  const requiredLeadConnections = qualityLoopConnections.filter(
    (connection) => connection.isLead,
  ).length;

  return {
    leadConnections: leadConnections.length,
    requiredLeadConnections,
    remainingLeadConnections: Math.max(0, requiredLeadConnections - leadConnections.length),
    hasMaterialTrace: revealedConnectionIds.has("quality-material"),
    canDiagnose: leadConnections.length === requiredLeadConnections,
  };
}

export function isQualityLoopReadyForDiagnosis(progress) {
  return getQualityLoopInvestigationStatus(progress).canDiagnose;
}

export const qualityLoopModule = Object.freeze({
  id: qualityLoopChallengeId,
  interaction: "Information connection",
  createInitialState: createInitialQualityLoopState,
});
