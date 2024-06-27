import React from "react";
import OrdersDataTable from "../../components/orders-table/orders-data-table.component";
import { useConfig } from "@openmrs/esm-framework";

const CompletedLabRequestsTable: React.FC = () => {
  const config = useConfig();
  return (
    <OrdersDataTable
      fulfillerStatus="COMPLETED"
      excludeColumns={[]}
      excludeCanceledAndDiscontinuedOrders={false}
      actionsSlotName="completed-test-action-slot"
    />
  );
};

export default CompletedLabRequestsTable;
