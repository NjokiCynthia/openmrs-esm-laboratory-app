import { Order } from "@openmrs/esm-patient-common-lib";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { setFulfillerStatus } from "../../laboratory-resource";
import {
  restBaseUrl,
  showNotification,
  showSnackbar,
  useAbortController,
  useConfig,
} from "@openmrs/esm-framework";
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  ContentSwitcher,
  Switch,
  Select,
  SelectItem,
  InlineNotification,
  RadioButton,
  RadioButtonGroup,
  InlineLoading,
} from "@carbon/react";
import { mutate } from "swr";
import { Config } from "../../config-schema";
import { MappedQueueEntry } from "../..";

interface CompletedTestModal {
  closeModal: () => void;
  queueEntry: MappedQueueEntry;
}

const CompletedTestModal: React.FC<CompletedTestModal> = ({
  queueEntry,
  closeModal,
}) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { laboratoryOrderTypeUuid } = useConfig<Config>();
  const abortController = useAbortController();
  const { allowedPriorities, allowedStatuses } = queueEntry.queue ?? {};

  const handlePickup = () => {
    setIsSubmitting(true);
    setFulfillerStatus(queueEntry.id, "IN_PROGRESS", abortController).then(
      () => {
        mutate(
          (key) =>
            typeof key === "string" &&
            key.startsWith(
              `${restBaseUrl}/order?orderTypes=${laboratoryOrderTypeUuid}`
            ),
          undefined,
          { revalidate: true }
        );
        setIsSubmitting(false);
        closeModal();
        showSnackbar({
          isLowContrast: true,
          title: t("pickedAnOrder", "Picked an order"),
          kind: "success",
          subtitle: t(
            "orderPickedSuccessfully",
            "You have successfully picked an order"
          ),
        });
      },
      (error) => {
        setIsSubmitting(false);
        showNotification({
          title: t(`errorPickingAnOrder', 'Error picking an order`),
          kind: "error",
          critical: true,
          description: error?.message,
        });
      }
    );
  };

  return (
    <div>
      <ModalHeader
        closeModal={closeModal}
        title={t("sendBackPatient", "Send Back Patient")}
      />
      <ModalBody>
        <p>
          {t(
            "pickRequestConfirmationText",
            'Continuing will update the request status to "In Progress" and advance it to the next stage. Are you sure you want to proceed?'
          )}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          {t("discard", "Discard")}
        </Button>
        <Button type="submit" onClick={handlePickup} disabled={isSubmitting}>
          {t("sendBackPatient", "Send Back Patient")}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default CompletedTestModal;
