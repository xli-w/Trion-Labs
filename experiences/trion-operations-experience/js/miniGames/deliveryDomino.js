export const deliveryDominoChallengeId = "delivery-domino";

export const deliveryDominoDependencies = Object.freeze([
  Object.freeze({
    id: "material-delivery",
    label: "Material delivery",
    type: "Logistics signal",
    signal: "Coil 18 is 75 min late",
    detail: "The supplier arrival is now expected at 12:35, after Line 02 is due to start.",
    timeAvailable: "75 min late",
    consequence:
      "The delay is recorded in logistics, but the exception has not reached the production schedule.",
    dependsOn: null,
    announcement:
      "The supplier delay is visible in logistics, but it has not yet changed the work planned for Line 02.",
  }),
  Object.freeze({
    id: "production-schedule",
    label: "Production schedule",
    type: "Planned work",
    signal: "Line 02 / Job 917",
    detail: "The active schedule still expects Coil 18 to be ready for a 12:00 start.",
    timeAvailable: "35 min to scheduled start",
    consequence:
      "Without the logistics exception, the schedule cannot show that Job 917 will wait for material.",
    dependsOn: "material-delivery",
    announcement:
      "The planned Line 02 start depends on the delayed material, but the schedule still appears on time.",
  }),
  Object.freeze({
    id: "available-capacity",
    label: "Available capacity",
    type: "Production constraint",
    signal: "33 min buffer remains",
    detail: "The delayed start uses the buffer that protects work later in the afternoon.",
    timeAvailable: "33 min capacity buffer",
    consequence:
      "A late start leaves less room to recover the next jobs unless the plan is changed before the line waits.",
    dependsOn: "production-schedule",
    announcement:
      "The material delay consumes the only buffer protecting the following jobs on Line 02.",
  }),
  Object.freeze({
    id: "customer-orders",
    label: "Customer orders",
    type: "Order impact",
    signal: "Two commitments at risk",
    detail: "The jobs following Line 02 now carry material and capacity risk into customer commitments.",
    timeAvailable: "Two orders at risk",
    consequence:
      "Planning can see the work sequence, but delivery teams have no early view of which customers need a response.",
    dependsOn: "available-capacity",
    announcement:
      "Two customer commitments now depend on whether Line 02 can recover the delayed start.",
  }),
  Object.freeze({
    id: "delivery-commitments",
    label: "Delivery commitments",
    type: "Customer promise",
    signal: "14:30 to 17:15 dispatch",
    detail: "The delivery team is still working from the original dispatch times.",
    timeAvailable: "No shared warning",
    consequence:
      "The issue reaches the customer promise only after production is already constrained.",
    dependsOn: "customer-orders",
    announcement:
      "Delivery commitments carry the consequence of a delay that teams could have acted on earlier.",
  }),
]);

export const deliveryDominoOrders = Object.freeze([
  Object.freeze({
    id: "order-402",
    reference: "Order 402",
    customer: "Alder Home",
    commitment: "14:30 dispatch",
    currentStatus: "At risk",
    currentDetail: "Finishing work cannot begin until the delayed material reaches Line 02.",
    resolvedStatus: "Replanned",
    resolvedDetail: "Available work is brought forward while Coil 18 arrives.",
  }),
  Object.freeze({
    id: "order-417",
    reference: "Order 417",
    customer: "North & Co.",
    commitment: "16:00 dispatch",
    currentStatus: "At risk",
    currentDetail: "Its planned capacity buffer is being used by the delayed Line 02 start.",
    resolvedStatus: "Confirm arrival",
    resolvedDetail: "The order is resequenced, but the supplier arrival still needs confirmation.",
  }),
  Object.freeze({
    id: "order-429",
    reference: "Order 429",
    customer: "Fieldstone",
    commitment: "17:15 dispatch",
    currentStatus: "Watch",
    currentDetail: "It is not yet late, but it follows the work that has lost its recovery buffer.",
    resolvedStatus: "Protected",
    resolvedDetail: "The revised sequence preserves the remaining afternoon capacity.",
  }),
]);

export const deliveryDominoDecisions = Object.freeze([
  Object.freeze({
    id: "connect-material-and-production-planning",
    title: "Connect material status with production planning",
    description:
      "Show arrival changes beside the production schedule, capacity buffer, affected orders, and delivery commitments.",
    effectLabel: "Turns a late delivery into an earlier shared exception.",
    completesChallenge: true,
    outcomeTitle: "The material delay can now be acted on before it spreads.",
    outcomeSummary:
      "The supplier delay was visible in logistics, but its effect on production and customer orders was not. One connected view gives planning and delivery teams time to respond together.",
    outcomeDetail:
      "The material still arrives late. The team can now resequence available work, protect the remaining capacity, and give one affected customer a timely update instead of discovering the issue at dispatch.",
    kpiChanges: Object.freeze({
      delivery: Object.freeze({
        delta: 8,
        explanation: "Affected commitments are identified early enough to replan the work and customer response.",
      }),
      visibility: Object.freeze({
        delta: 3,
        explanation: "Material, schedule, capacity, and order risk now share the same exception context.",
      }),
      throughput: Object.freeze({
        delta: 2,
        explanation: "Available work can move forward so the line avoids avoidable waiting.",
      }),
    }),
    announcement:
      "Material risk now reaches planning and delivery before it disrupts the schedule. Logistics + Production Visibility is available.",
  }),
  Object.freeze({
    id: "add-logistics-delay-report",
    title: "Add a logistics delay report",
    description:
      "Publish a clearer supplier-delay report for the logistics team to review each day.",
    effectLabel: "Clarifies the source signal, but leaves the schedule and commitments separate.",
    completesChallenge: false,
    outcomeTitle: "The delay report is clearer, but the domino chain remains.",
    outcomeSummary:
      "Logistics can see the late arrival more clearly. Planning and delivery still have to discover its effect by comparing separate information.",
    outcomeDetail:
      "A report improves awareness in one area, but it does not create the shared exception needed to protect the work already depending on the material.",
    kpiChanges: Object.freeze({
      delivery: Object.freeze({
        delta: 0,
        explanation: "The affected customer commitments still receive no earlier warning.",
      }),
      visibility: Object.freeze({
        delta: 1,
        explanation: "The logistics signal is easier to read, but it remains isolated.",
      }),
      throughput: Object.freeze({
        delta: 0,
        explanation: "The line still waits if the schedule is not informed before the start.",
      }),
    }),
    announcement:
      "The logistics signal is clearer, but the production schedule and customer commitments remain disconnected.",
  }),
  Object.freeze({
    id: "reserve-line-capacity-manually",
    title: "Reserve capacity and call customers manually",
    description:
      "Hold extra Line 02 time and ask the delivery team to call the two customers at risk.",
    effectLabel: "Contains this incident, but consumes capacity and cannot make the next delay visible sooner.",
    completesChallenge: false,
    outcomeTitle: "The manual response protects one promise by constraining the next.",
    outcomeSummary:
      "A manual call can help one customer, but holding capacity reduces the work the line can complete and leaves the same disconnected handoffs in place.",
    outcomeDetail:
      "Use the material exception to coordinate the existing capacity and commitments. That creates a repeatable response without reserving work blindly.",
    kpiChanges: Object.freeze({
      delivery: Object.freeze({
        delta: 1,
        explanation: "One customer may receive an earlier update, but the full delivery risk remains unclear.",
      }),
      visibility: Object.freeze({
        delta: 0,
        explanation: "The information still has to be assembled manually for each incident.",
      }),
      throughput: Object.freeze({
        delta: -2,
        explanation: "Holding capacity reduces useful output while the root information gap remains.",
      }),
    }),
    announcement:
      "The manual response protects a single promise, but it consumes capacity without connecting the next material exception to the plan.",
  }),
]);

export function createInitialDeliveryDominoState() {
  return {
    selectedDependencyId: null,
    inspectedDependencyIds: [],
    traceError: null,
    decisionId: null,
    decisionError: null,
  };
}

export function getDeliveryDominoDependencyById(dependencyId) {
  return deliveryDominoDependencies.find((dependency) => dependency.id === dependencyId);
}

export function getDeliveryDominoDecisionById(decisionId) {
  return deliveryDominoDecisions.find((decision) => decision.id === decisionId);
}

export function isDeliveryDominoDependencyAvailable(dependencyId, progress) {
  const dependency = getDeliveryDominoDependencyById(dependencyId);

  if (!dependency) {
    throw new Error(`Unknown Delivery Domino dependency: ${dependencyId}`);
  }

  return (
    !dependency.dependsOn || progress.inspectedDependencyIds.includes(dependency.dependsOn)
  );
}

export function getDeliveryDominoTraceStatus(progress) {
  const inspectedDependencyIds = new Set(progress.inspectedDependencyIds);
  const inspectedDependencies = deliveryDominoDependencies.filter((dependency) =>
    inspectedDependencyIds.has(dependency.id),
  );
  const nextDependency = deliveryDominoDependencies.find(
    (dependency) =>
      !inspectedDependencyIds.has(dependency.id) &&
      isDeliveryDominoDependencyAvailable(dependency.id, progress),
  );

  return {
    inspectedCount: inspectedDependencies.length,
    requiredDependencies: deliveryDominoDependencies.length,
    remainingDependencies: Math.max(
      0,
      deliveryDominoDependencies.length - inspectedDependencies.length,
    ),
    isComplete: inspectedDependencies.length === deliveryDominoDependencies.length,
    nextDependency,
  };
}

export function isDeliveryDominoReadyForDecision(progress) {
  return getDeliveryDominoTraceStatus(progress).isComplete;
}

export const deliveryDominoModule = Object.freeze({
  id: deliveryDominoChallengeId,
  interaction: "Dependency tracing",
  createInitialState: createInitialDeliveryDominoState,
});
