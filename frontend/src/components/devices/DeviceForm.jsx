import * as yup from "yup";

import DeviceBrandImg from "./DeviceBrandImg";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { brandList, statusList } from "../../utils/DeviceParams";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SCHEMA = yup.object({
  brand: yup.string().required("Please select a Brand."),
  model: yup.string().required("A Model is required."),
  serialNumber: yup.string().required("A Serial Number is required."),
  condition: yup.string().required("Please select a Condition."),
  hardDrive: yup.string().required("A storage is required."),
  ram: yup.string().required("A RAM value is required."),
  gpu: yup.string(),
  cpu: yup.string().required("A CPU value is required."),
  notes: yup.string(),
});

const DeviceForm = ({ isOpen, onClose, selectedDevice }) => {
  const [brandValue, setBrandValue] = useState(new Set([]));
  const [statusValue, setStatusValue] = useState(new Set([]));

  const isNewDevice = Boolean(!selectedDevice || selectedDevice?.id === 0);

  const {
    control,
    getValues,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: selectedDevice,
    mode: "all",
    resolver: yupResolver(SCHEMA),
  });

  const device = getValues();

  const handleSubmit = (sendFormValues = false) => {
    onClose(sendFormValues ? getValues() : null);
    setBrandValue(new Set([]));
    setStatusValue(new Set([]));
    reset({});
  };

  useEffect(() => {
    if (selectedDevice) {
      const { brand, condition } = selectedDevice;
      setBrandValue(new Set([brand]));
      setStatusValue(new Set([condition]));
      reset(selectedDevice);
    }
  }, [selectedDevice]);

  return (
    <Modal
      size="xl"
      backdrop="opaque"
      isDismissable={false}
      isOpen={isOpen}
      onClose={() => handleSubmit()}
    >
      <ModalContent>
        <ModalHeader>{isNewDevice ? "New Device" : "Edit Device"}</ModalHeader>
        <ModalBody>
          <form
            onKeyDown={(e) => (e.key === "Enter" ? e.preventDefault() : null)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-rows-4 grid-flow-col gap-4">
              <Controller
                control={control}
                name="brand"
                render={({ field }) => (
                  <Select
                    isRequired
                    label="Brand"
                    placeholder="Select a brand"
                    items={brandList}
                    selectedKeys={brandValue}
                    onSelectionChange={(e) => {
                      setBrandValue(e);

                      const iterator = e.values();
                      const selectedValue = iterator.next().value;
                      field.onChange(selectedValue);
                    }}
                    isInvalid={!!errors.brand?.message}
                    errorMessage={errors.brand?.message}
                  >
                    {(brand) => <SelectItem>{brand.label}</SelectItem>}
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="model"
                render={({ field }) => (
                  <Input
                    isRequired
                    label="Model"
                    placeholder="Enter model"
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                    isInvalid={!!errors.model?.message}
                    errorMessage={errors.model?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="serialNumber"
                render={({ field }) => (
                  <Input
                    isRequired
                    label="Serial Number"
                    placeholder="Enter Serial Number"
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                    isInvalid={!!errors.serialNumber?.message}
                    errorMessage={errors.serialNumber?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="condition"
                render={({ field }) => (
                  <Select
                    isRequired
                    label="Condition"
                    placeholder="Select a condition"
                    items={statusList}
                    selectedKeys={statusValue}
                    onSelectionChange={(e) => {
                      setStatusValue(e);

                      const iterator = e.values();
                      const selectedValue = iterator.next().value;
                      field.onChange(selectedValue);
                    }}
                    isInvalid={!!errors.condition?.message}
                    errorMessage={errors.condition?.message}
                  >
                    {(status) => <SelectItem>{status.label}</SelectItem>}
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="hardDrive"
                render={({ field }) => (
                  <Input
                    isRequired
                    label="Storage (HDD/SSD)"
                    placeholder="Enter Storage"
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                    isInvalid={!!errors.hardDrive?.message}
                    errorMessage={errors.hardDrive?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="ram"
                render={({ field }) => (
                  <Input
                    isRequired
                    label="RAM"
                    placeholder="Enter RAM"
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                    isInvalid={!!errors.ram?.message}
                    errorMessage={errors.ram?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="cpu"
                render={({ field }) => (
                  <Input
                    isRequired
                    label="CPU"
                    placeholder="Enter CPU"
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                    isInvalid={!!errors.cpu?.message}
                    errorMessage={errors.cpu?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="gpu"
                render={({ field }) => (
                  <Input
                    label="GPU"
                    placeholder="Enter GPU"
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <Textarea
                  label="Notes"
                  placeholder="Enter your notes about the device"
                  value={field.value}
                  onValueChange={field.onChange}
                  name={field.name}
                />
              )}
            />
          </form>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <div>{device?.brand && <DeviceBrandImg device={device} />}</div>
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
              {isNewDevice ? "Create" : "Save"}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeviceForm;
