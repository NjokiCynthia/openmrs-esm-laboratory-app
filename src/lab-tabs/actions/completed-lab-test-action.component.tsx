import { OverflowMenuItem } from "@carbon/react";
import { showModal, useVisit } from "@openmrs/esm-framework";
import { Order } from "@openmrs/esm-patient-common-lib";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styles from "./actions.scss";
import { useVisitQueueEntry } from "./useQueues";

interface CompletedTestMenuProps {
  order: Order;
}

const CompletedTestAction: React.FC<CompletedTestMenuProps> = ({ order }) => {
  const { t } = useTranslation();
  const unSupportedStatuses = ["IN_PROGRESS", "COMPLETED", "DECLINED"];
  const { currentVisit, isLoading } = useVisit(order?.patient?.uuid);

  const { queueEntry, isLoading: isLoadingQueueEntry } = useVisitQueueEntry(
    order.patient.uuid,
    currentVisit?.uuid
  );

  if (isLoading || isLoadingQueueEntry) {
    return;
  }
  const launchModal = () =>
    showModal("edit-queue-entry-status-modal", {
      closeModal: () => {},
      queueEntry: queueEntry,
    });

  return (
    <OverflowMenuItem
      itemText={t("sendBackPatient", "Send Back Patient")}
      onClick={() => launchModal()}
      //disabled={unSupportedStatuses.includes(order.fulfillerStatus)}
      className={styles.menuItem}
    />
  );
};

export default CompletedTestAction;
