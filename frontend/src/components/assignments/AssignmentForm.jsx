import * as yup from "yup";

import {
  Button,
  DatePicker,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { reasonsList } from "../../utils/AssignmentsParams";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseDate } from "@internationalized/date";

const SCHEMA = yup.object({
  date: yup.string().required("Please set the starting date."),
  assignedUserId: yup.string().required("Please the target user."),
  reason: yup.string().required("Please write a reason for the assignment."),
  endDate: yup.string().notRequired(),
  notes: yup.string(),
});

const AssignmentForm = ({ isOpen, onClose, selectedAssignment, users }) => {
  const [targetUserValue, setTargetUserValue] = useState(new Set([]));
  const [reasonValue, setReasonValue] = useState(new Set([]));
  const [initialDateValue, setInitialDateValue] = useState(null);
  const [endDateValue, setEndDateValue] = useState(null);

  const isNewAssignment = Boolean(
    !selectedAssignment || selectedAssignment?.id === 0
  );

  const {
    control,
    getValues,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: selectedAssignment,
    mode: "all",
    resolver: yupResolver(SCHEMA),
  });

  const handleSubmit = (sendFormValues = false) => {
    onClose(sendFormValues ? getValues() : null);
    setTargetUserValue(new Set([]));
    setReasonValue(new Set([]));
    setInitialDateValue(null);
    setEndDateValue(null);
    reset({});
  };

  useEffect(() => {
    if (selectedAssignment) {
      const { date, endDate, reason } = selectedAssignment;
      if (date) {
        setInitialDateValue(parseDate(date));
      }
      if (endDate) {
        setEndDateValue(parseDate(endDate));
      }
      /*setTargetUserValue(new Set([brand]));
      setReasonValue(new Set([reason]));*/
      reset(selectedAssignment);
    }
  }, [selectedAssignment]);

  return (
    <Modal
      size="xl"
      backdrop="opaque"
      isDismissable={false}
      isOpen={isOpen}
      onClose={() => handleSubmit()}
    >
      <ModalContent>
        <ModalHeader>
          {isNewAssignment ? "New Assignment" : "Edit Assignment"}
        </ModalHeader>
        <ModalBody>
          <form
            onKeyDown={(e) => (e.key === "Enter" ? e.preventDefault() : null)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePicker
                      isRequired
                      label="Initial date"
                      placeholder="Select a date"
                      value={initialDateValue}
                      onChange={(e) => {
                        setInitialDateValue(e);
                        field.onChange(e ? e.toString() : null);
                      }}
                      name={field.name}
                      isInvalid={!!errors.date?.message}
                      errorMessage={errors.date?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      label="End date"
                      placeholder="Select a date (optional)"
                      value={endDateValue}
                      onChange={(e) => {
                        setEndDateValue(e);
                        field.onChange(e ? e.toString() : null);
                      }}
                      name={field.name}
                      isInvalid={!!errors.endDate?.message}
                      errorMessage={errors.endDate?.message}
                    />
                  )}
                />
              </div>

              <div className="flex gap-4">
                <Controller
                  control={control}
                  name="assignedUserId"
                  render={({ field }) => (
                    <Select
                      isRequired
                      label="User"
                      placeholder="Select a user"
                      items={users || []}
                      selectedKeys={targetUserValue}
                      onSelectionChange={(e) => {
                        setTargetUserValue(e);

                        const iterator = e.values();
                        const selectedValue = iterator.next().value;
                        field.onChange(selectedValue);
                      }}
                      isInvalid={!!errors.assignedUserId?.message}
                      errorMessage={errors.assignedUserId?.message}
                    >
                      {(user) => <SelectItem>{user.name}</SelectItem>}
                    </Select>
                  )}
                />

                <Controller
                  control={control}
                  name="reason"
                  render={({ field }) => (
                    <Select
                      isRequired
                      label="Reason"
                      placeholder="Select a reason"
                      items={reasonsList}
                      selectedKeys={reasonValue}
                      onSelectionChange={(e) => {
                        setReasonValue(e);

                        const iterator = e.values();
                        const selectedValue = iterator.next().value;
                        field.onChange(selectedValue);
                      }}
                      isInvalid={!!errors.reason?.message}
                      errorMessage={errors.reason?.message}
                    >
                      {(reason) => <SelectItem>{reason.label}</SelectItem>}
                    </Select>
                  )}
                />
              </div>
            </div>

            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <Textarea
                  label="Notes"
                  placeholder="Enter your notes about the assignment"
                  value={field.value}
                  onValueChange={field.onChange}
                  name={field.name}
                />
              )}
            />
          </form>
        </ModalBody>
        <ModalFooter className="flex justify-end">
          <div className="flex gap-4">
            <Button
              color="danger"
              variant="light"
              onPress={() => handleSubmit()}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={() => handleSubmit(true)}
              isDisabled={!isValid || !isDirty}
            >
              {isNewAssignment ? "Create" : "Edit"}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AssignmentForm;
