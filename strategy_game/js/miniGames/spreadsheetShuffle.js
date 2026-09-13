export const spreadsheetShuffleChallengeId = "spreadsheet-shuffle";

export const spreadsheetShuffleRemovalBudget = 2;

export const spreadsheetShuffleRequiredRemovalIds = Object.freeze([
  "copy-production-figures",
  "reconcile-differences",
]);

export const spreadsheetShuffleWorkflow = Object.freeze([
  Object.freeze({
    id: "receive-production-update",
    label: "Receive production update",
    category: "Source signal",
    detail: "A line update arrives in the planner's inbox.",
  }),
  Object.freeze({
    id: "open-planning-spreadsheet",
    label: "Open planning spreadsheet",
    category: "Manual workspace",
    detail: "The planner starts a separate local version of the plan.",
  }),
  Object.freeze({
    id: "copy-production-figures",
    label: "Copy production figures",
    category: "Duplicate entry",
    detail: "The same output figures are typed into a second place.",
  }),
  Object.freeze({
    id: "check-erp-information",
    label: "Check ERP information",
    category: "Source check",
    detail: "Order and material context sits in another system.",
  }),
  Object.freeze({
    id: "reconcile-differences",
    label: "Reconcile differences",
    category: "Manual check",
    detail: "The planner compares copied figures before they can act.",
  }),
  Object.freeze({
    id: "email-planning-update",
    label: "Email planning update",
    category: "Manual handoff",
    detail: "The latest plan is sent as another attachment.",
  }),
  Object.freeze({
    id: "wait-for-confirmation",
    label: "Wait for confirmation",
    category: "Delayed handoff",
    detail: "The schedule cannot move until someone replies.",
  }),
  Object.freeze({
    id: "update-schedule",
    label: "Update schedule",
    category: "Planning decision",
    detail: "The planner finally updates the active schedule.",
  }),
]);

export const spreadsheetShuffleWorkflowSnapshots = Object.freeze({
  fragmented: Object.freeze({
    id: "fragmented",
    label: "Current manual route",
    summary: "One update is copied, checked, and passed through several separate handoffs.",
    metrics: Object.freeze({
      activities: 8,
      handoffs: 5,
      minutes: 47,
    }),
    steps: spreadsheetShuffleWorkflow,
  }),
  simplified: Object.freeze({
    id: "simplified",
    label: "Duplicate work removed",
    summary: "The planner no longer copies figures or reconciles their own duplicate record.",
    metrics: Object.freeze({
      activities: 6,
      handoffs: 3,
      minutes: 32,
    }),
    steps: Object.freeze([
      Object.freeze({
        label: "Receive production update",
        category: "Source signal",
      }),
      Object.freeze({
        label: "Open planning workspace",
        category: "Planning work",
      }),
      Object.freeze({
        label: "Check ERP information",
        category: "Source check",
      }),
      Object.freeze({
        label: "Update schedule",
        category: "Planning decision",
      }),
      Object.freeze({
        label: "Email planning update",
        category: "Manual handoff",
      }),
      Object.freeze({
        label: "Wait for confirmation",
        category: "Delayed handoff",
      }),
    ]),
  }),
  standardised: Object.freeze({
    id: "standardised",
    label: "One consistent route",
    summary: "Production and ERP context are checked before one standard planning update is shared.",
    metrics: Object.freeze({
      activities: 5,
      handoffs: 2,
      minutes: 22,
    }),
    steps: Object.freeze([
      Object.freeze({
        label: "Receive production update",
        category: "Source signal",
      }),
      Object.freeze({
        label: "Check production and ERP context",
        category: "Shared context",
      }),
      Object.freeze({
        label: "Apply standard planning update",
        category: "Consistent work",
      }),
      Object.freeze({
        label: "Update schedule",
        category: "Planning decision",
      }),
      Object.freeze({
        label: "Share planning update",
        category: "Clear handoff",
      }),
    ]),
  }),
  automated: Object.freeze({
    id: "automated",
    label: "Connected planning flow",
    summary: "A standard update carries shared context into the schedule and planning handoff.",
    metrics: Object.freeze({
      activities: 4,
      handoffs: 1,
      minutes: 12,
    }),
    steps: Object.freeze([
      Object.freeze({
        label: "Receive production update",
        category: "Source signal",
      }),
      Object.freeze({
        label: "View connected source context",
        category: "Production + ERP",
      }),
      Object.freeze({
        label: "Automate schedule update",
        category: "Workflow automation",
      }),
      Object.freeze({
        label: "Share planning update",
        category: "Clear handoff",
      }),
    ]),
  }),
});

export const spreadsheetShuffleStandardisationOptions = Object.freeze([
  Object.freeze({
    id: "standardise-source-led-update",
    title: "Set one source-led planning sequence",
    description:
      "Check production and ERP context before one standard schedule update is created and shared.",
    effectLabel: "Reorders the surviving work around one consistent update.",
    completesPhase: true,
    outcomeTitle: "The planning route now follows the information.",
    outcomeSummary:
      "Production and ERP context are checked first, then one planning update moves into the schedule and handoff.",
    outcomeDetail:
      "The team no longer has to decide which worksheet or attachment contains the latest version of the plan.",
    announcement:
      "The planning workflow is standardised around one source-led update. The next decision is what to automate from this clearer flow.",
  }),
  Object.freeze({
    id: "retain-local-spreadsheet-layouts",
    title: "Let each planner keep their own worksheet order",
    description:
      "Keep the same activities, but allow each planner to arrange and label them differently.",
    effectLabel: "Keeps personal workarounds instead of creating a shared route.",
    completesPhase: false,
    outcomeTitle: "The duplicate work is gone, but the route still varies.",
    outcomeSummary:
      "Individual layouts may feel familiar, but they make the next handoff dependent on who prepared the update.",
    outcomeDetail:
      "Standardisation should make the same source information reach the schedule in the same order every time.",
    announcement:
      "Local spreadsheet layouts retain different planning routes. Choose the shared sequence that puts source context before the update.",
  }),
  Object.freeze({
    id: "add-second-reconciliation-check",
    title: "Add another reconciliation checkpoint",
    description:
      "Ask a second planner to check the update before the schedule is changed.",
    effectLabel: "Adds a safeguard, but restores the manual checking the redesign is removing.",
    completesPhase: false,
    outcomeTitle: "Another check protects the workaround, not the flow.",
    outcomeSummary:
      "A second check may catch an error, but it does not make the update consistent or connect the source information.",
    outcomeDetail:
      "Use a standard source-led route so checking is focused on meaningful exceptions, rather than repeated entry.",
    announcement:
      "Another reconciliation step adds effort without creating a consistent route. Choose the sequence that standardises the source information first.",
  }),
]);

export const spreadsheetShuffleAutomationOptions = Object.freeze([
  Object.freeze({
    id: "automate-connected-schedule-update",
    title: "Automate the connected schedule update",
    description:
      "Use the standard production and ERP context to update the schedule and share the planning change.",
    effectLabel: "Automates a clear workflow instead of a spreadsheet workaround.",
    completesChallenge: true,
    outcomeTitle: "Automation now supports a clear planning flow.",
    outcomeSummary:
      "The planner works from one standard update. Relevant production and ERP context travels with the schedule change instead of being copied between files.",
    outcomeDetail:
      "This illustrative change reduces repetitive checking and gives the planning team a more reliable view of the current schedule. It does not replace judgement about exceptions.",
    kpiChanges: Object.freeze({
      productivity: Object.freeze({
        delta: 12,
        explanation: "Less duplicate entry and reconciliation leaves more time for meaningful planning work.",
      }),
      visibility: Object.freeze({
        delta: 15,
        explanation: "Production and ERP context now travel with the planning update.",
      }),
      cost: Object.freeze({
        delta: 8,
        explanation: "Fewer repeated checks and attachments reduce avoidable planning effort.",
      }),
      delivery: Object.freeze({
        delta: 4,
        explanation: "A more reliable schedule update helps teams see commitments earlier.",
      }),
    }),
    resourceCosts: Object.freeze({
      improvementCapacity: 1,
    }),
    unlockIds: Object.freeze(["workflow-automation"]),
    announcement:
      "The standard planning update now carries connected context into the schedule. Workflow Automation is available.",
  }),
  Object.freeze({
    id: "automate-spreadsheet-copying",
    title: "Automate spreadsheet copying",
    description:
      "Use a script to move the same figures between the planner's existing files.",
    effectLabel: "Makes the copied workaround faster, but preserves its disconnected logic.",
    completesChallenge: false,
    outcomeTitle: "The copying would be quicker, but the workaround remains.",
    outcomeSummary:
      "A script can move figures between spreadsheets, yet the team would still need to reconcile versions and decide which file is current.",
    outcomeDetail:
      "Automate the shared schedule update after the duplicated work and inconsistent route have been removed.",
    announcement:
      "Automating spreadsheet copies would speed up duplicate work. Choose the connected schedule update that follows the new standard route.",
  }),
  Object.freeze({
    id: "automate-confirmation-emails",
    title: "Automate confirmation emails",
    description:
      "Send faster reminders when planning colleagues have not replied to the attached update.",
    effectLabel: "Speeds a handoff, but leaves the schedule dependent on an attachment and reply.",
    completesChallenge: false,
    outcomeTitle: "The reminder is faster, but the information still waits.",
    outcomeSummary:
      "Confirmation emails may arrive sooner, but the planning change is still separated from the schedule and its source context.",
    outcomeDetail:
      "Use automation where the standard information can move directly into the shared planning flow.",
    announcement:
      "Automated reminders make waiting more visible, but the schedule still depends on an attachment. Choose the connected schedule update instead.",
  }),
]);

export function createInitialSpreadsheetShuffleState() {
  return {
    selectedStepIds: [],
    simplificationComplete: false,
    selectionError: null,
    simplificationError: null,
    standardisationId: null,
    standardisationError: null,
    automationId: null,
    automationError: null,
  };
}

export function getSpreadsheetShuffleStepById(stepId) {
  return spreadsheetShuffleWorkflow.find((step) => step.id === stepId);
}

export function getSpreadsheetShuffleStandardisationById(optionId) {
  return spreadsheetShuffleStandardisationOptions.find((option) => option.id === optionId);
}

export function getSpreadsheetShuffleAutomationById(optionId) {
  return spreadsheetShuffleAutomationOptions.find((option) => option.id === optionId);
}

export function getSpreadsheetShuffleRemovalStatus(progress) {
  const selectedSteps = progress.selectedStepIds.map((stepId) => {
    const step = getSpreadsheetShuffleStepById(stepId);

    if (!step) {
      throw new Error(`Unknown selected Spreadsheet Shuffle step: ${stepId}`);
    }

    return step;
  });
  const selectedStepIds = new Set(progress.selectedStepIds);
  const requiredStepsSelected = spreadsheetShuffleRequiredRemovalIds.every((stepId) =>
    selectedStepIds.has(stepId),
  );

  return {
    selectedSteps,
    selectedCount: progress.selectedStepIds.length,
    removalBudget: spreadsheetShuffleRemovalBudget,
    remainingSelections: Math.max(
      0,
      spreadsheetShuffleRemovalBudget - progress.selectedStepIds.length,
    ),
    canApply: progress.selectedStepIds.length === spreadsheetShuffleRemovalBudget,
    hasRequiredSteps: requiredStepsSelected,
  };
}

export function isSpreadsheetShuffleSimplified(progress) {
  return progress.simplificationComplete;
}

export function isSpreadsheetShuffleStandardised(progress) {
  const option = getSpreadsheetShuffleStandardisationById(progress.standardisationId);
  return Boolean(option?.completesPhase);
}

export function isSpreadsheetShuffleAutomated(progress) {
  const option = getSpreadsheetShuffleAutomationById(progress.automationId);
  return Boolean(option?.completesChallenge);
}

export function getSpreadsheetShuffleWorkflowSnapshot(progress) {
  if (isSpreadsheetShuffleAutomated(progress)) {
    return spreadsheetShuffleWorkflowSnapshots.automated;
  }

  if (isSpreadsheetShuffleStandardised(progress)) {
    return spreadsheetShuffleWorkflowSnapshots.standardised;
  }

  if (isSpreadsheetShuffleSimplified(progress)) {
    return spreadsheetShuffleWorkflowSnapshots.simplified;
  }

  return spreadsheetShuffleWorkflowSnapshots.fragmented;
}

export const spreadsheetShuffleModule = Object.freeze({
  id: spreadsheetShuffleChallengeId,
  interaction: "Workflow redesign",
  createInitialState: createInitialSpreadsheetShuffleState,
});
