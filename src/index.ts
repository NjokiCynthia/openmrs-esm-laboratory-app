/* eslint-disable prettier/prettier */
import {
  OpenmrsResource,
  defineConfigSchema,
  getAsyncLifecycle,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createHomeDashboardLink } from "./components/create-dashboard-link.component";
import rootComponent from "./root.component";

const moduleName = "@openmrs/esm-laboratory-app";

const options = {
  featureName: "laboratory",
  moduleName,
};
export interface Queue {
  uuid: string;
  display: string;
  name: string;
  description: string;
  location: Location;
  service: Concept;
  allowedPriorities: Array<Concept>;
  allowedStatuses: Array<Concept>;
}
export interface MappedQueueEntry {
  id: string;
  name: string;
  patientAge: string;
  patientSex: string;
  patientDob: string;
  patientUuid: string;
  queue: Queue;
  priority: Concept;
  priorityComment: string;
  status: Concept;
  visitType: string;
  visitUuid: string;
  waitTime: string;
  queueEntryUuid: string;
  queueLocation: string;
  sortWeight: string;
}

export interface QueueEntrySearchCriteria {
  queue?: Array<string> | string;
  location?: Array<string> | string;
  service?: Array<string> | string;
  status?: Array<string> | string;
  isEnded: boolean;
}

export interface Concept extends OpenmrsResource {}

export interface Provider extends OpenmrsResource {}

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export const root = getSyncLifecycle(rootComponent, options);

export const laboratoryDashboardLink = getSyncLifecycle(
  createHomeDashboardLink({
    name: "laboratory",
    slot: "laboratory-dashboard-slot",
    title: "Laboratory",
  }),
  options
);

// Modals

export const pickupLabRequestModal = getAsyncLifecycle(
  () => import("./lab-tabs/modals/pickup-lab-request-modal.component"),
  options
);

export const completedTestModal = getAsyncLifecycle(
  () => import("./lab-tabs/modals/edit-queue-entry-status-modal"),
  options
);

export const rejectLabRequestModal = getAsyncLifecycle(
  () => import("./lab-tabs/modals/reject-lab-request-modal.component"),
  options
);

export const completedLabRequestsTable = getAsyncLifecycle(
  () =>
    import(
      "./lab-tabs/data-table-extensions/completed-lab-requests-table.extension"
    ),
  options
);

// Tables and tiles

export const allLabRequestsTable = getAsyncLifecycle(
  () =>
    import("./lab-tabs/data-table-extensions/tests-ordered-table.extension"),
  options
);

export const inprogressLabRequestsTable = getAsyncLifecycle(
  () =>
    import(
      "./lab-tabs/data-table-extensions/in-progress-lab-requests-table.extension"
    ),
  options
);

export const worklistTile = getAsyncLifecycle(
  () => import("./lab-tiles/inprogress-lab-requests-tile.component"),
  options
);

export const completedTile = getAsyncLifecycle(
  () => import("./lab-tiles/completed-lab-requests-tile.component"),
  options
);

export const testOrderedTile = getAsyncLifecycle(
  () => import("./lab-tiles/all-lab-requests-tile.component"),
  options
);

// Actions

export const addLabRequestResultsAction = getAsyncLifecycle(
  () => import("./lab-tabs/actions/add-lab-request-results-action.component"),
  options
);

export const pickupLabRequestAction = getAsyncLifecycle(
  () => import("./lab-tabs/actions/pickup-lab-request-action.component"),
  options
);

export const rejectLabRequestAction = getAsyncLifecycle(
  () => import("./lab-tabs/actions/reject-lab-request-action.component"),
  options
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
