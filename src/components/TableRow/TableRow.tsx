import { useState, forwardRef } from "react";
import { TableCell } from "../TableCell";
import { TableRowProps, TableRecord } from "./TableRow.types";

export const TableRow = forwardRef(
  (
    { record, onRowRecordChange, onRowDelete, ...props }: TableRowProps,
    ref: React.ForwardedRef<HTMLTableRowElement>
  ) => {
    const [rowRecord, setRowRecord] = useState<TableRecord>(record);

    const handleRowUpdate = (field: keyof TableRecord, value: string) => {
      setRowRecord({ ...rowRecord, [field]: value });
      onRowRecordChange && onRowRecordChange({ ...rowRecord, [field]: value });
    };

    const handleRowDelete = () => onRowDelete && onRowDelete();

    return (
      <tr className='row' ref={ref} {...props}>
        <TableCell
          value={rowRecord.name}
          onValueChange={(name) => {
            handleRowUpdate("name", name);
          }}
          placeholder='empty name'
        />
        <TableCell
          value={rowRecord.value}
          onValueChange={(value) => {
            handleRowUpdate("value", value);
          }}
          placeholder='empty value'
        />
        <TableCell
          component={
            <button className='btn' onClick={handleRowDelete}>
              delete
            </button>
          }
        />
      </tr>
    );
  }
);

export default TableRow;
