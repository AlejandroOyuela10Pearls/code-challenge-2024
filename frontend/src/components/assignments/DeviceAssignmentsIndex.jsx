import moment from "moment";
import DeviceCondition from "../devices/DeviceCondition";
import AssignmentsList from "./AssignmentsList";
import AssignmentForm from "./AssignmentForm";
import AssignmentDetails from "./AssignmentDetails";
import DevicesDetails from "../devices/DevicesDetails";
import Icon from "../common/Icon";
import TwoButtonsModal from "../common/TwoButtonsModal";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDevice } from "../../services/devices";
import {
  fetchDeviceAssignments,
  createAssignment,
  updateAssignment,
} from "../../services/assignments";
import { fetchUsers } from "../../services/users";
import { brandList } from "../../utils/DeviceParams";
import { Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../services/redux-toolkit/slices/listenerSlice";
import { selectUser } from "../../services/redux-toolkit/slices/userSlice";

const DeviceAssignmentsIndex = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [device, setDevice] = useState({});
  const [showDetails, setShowDetails] = useState(null);
  const [assignmentFormData, setAssignmentFormData] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [deleteAssignment, setDeleteAssignment] = useState(null);

  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState([]);

  const currentUser = useSelector(selectUser);

  const genericErrorAlert = (message = "Error loading device details.") => {
    dispatch(
      setAlert({
        message: message,
        status: "error",
        autoHide: true,
      })
    );
  };

  const loadDeviceData = async (id) => {
    try {
      const response = await fetchDevice(id);
      if (response) {
        setDevice(response);
      } else {
        console.log(response);
        genericErrorAlert();
      }
    } catch (error) {
      console.log(error);
      genericErrorAlert();
    }
  };

  const loadDeviceAssignments = async (id) => {
    try {
      const response = await fetchDeviceAssignments(id);
      if (response) {
        setAssignments(response);
      } else {
        console.log(response);
        genericErrorAlert("Error loading device assignments.");
      }
    } catch (error) {
      console.log(error);
      genericErrorAlert("Error loading device assignments.");
    }
  };

  const loadUsersList = async () => {
    try {
      const usersList = await fetchUsers();
      setUsers(usersList);
    } catch (error) {
      genericErrorAlert("Error loading user list.");
    }
  };

  const fetchData = async (id) => {
    await loadDeviceData(id);
    await loadDeviceAssignments(id);
    await loadUsersList();
  };

  useEffect(() => {
    if (params.id) {
      fetchData(params.id);
    }
  }, [params]);

  const brandName = brandList.find((x) => x.key === device?.brand);

  const mapAssignmentFormData = (formData) => {
    const { date, id, assignedUserId, reason, notes, endDate } = formData;
    const { id: deviceId, serialNumber } = device;
    const { id: userId, name } = currentUser;

    const targetUser = users.find((x) => x.id === assignedUserId);

    return {
      id: id,
      date: `${date}T12:00:00Z`,
      deviceId: deviceId,
      deviceSerial: serialNumber,
      supportUserId: userId,
      supportUserName: name,
      assignedUserId: assignedUserId,
      assignedUserName: targetUser.name,
      reason: reason,
      notes: notes,
      endDate: endDate ? `${endDate}T12:00:00Z` : null,
    };
  };

  const handleAddAssignment = async (data) => {
    const parsedData = mapAssignmentFormData(data);
    console.log("parsedData", parsedData);
    try {
      let response;
      if (parsedData.id === 0) {
        delete parsedData.id;
        response = await createAssignment(parsedData);
        dispatch(
          setAlert({
            message: "Device Successfully Assigned.",
            status: "success",
            autoHide: true,
          })
        );
      } else {
        /*response = await updateAssignment(parsedData.id, data);
        dispatch(
          setAlert({
            message: "Device updated successfully.",
            status: "success",
            autoHide: true,
          })
        );*/
      }
      loadDeviceAssignments();
    } catch (error) {
      dispatch(
        setAlert({
          message: "Error creating or updating assignment. Please try again.",
          status: "error",
          autoHide: true,
        })
      );
    }
  };

  return (
    <div className="w-full p-[20px] h-full">
      <Card className="w-full h-full">
        <CardHeader className="flex justify-between pl-5 pb-0">
          <div className="flex gap-4 items-center">
            <Icon icon="fa-solid fa-house-laptop" size="xl" />
            <p className="text-[24px]">Assignments</p>
          </div>
          <Button
            auto
            color="primary"
            onPress={() =>
              setAssignmentFormData({
                id: 0,
                date: new Date().toISOString().split("T")[0],
                assignedUserId: "",
                reason: "",
                endDate: "",
                notes: "",
              })
            }
            style={{ borderRadius: "10px" }}
          >
            Set New Assignment
          </Button>
        </CardHeader>

        <CardBody className="flex flex-col w-full h-full gap-5">
          <div className="flex justify-between w-full border-b-[1px]">
            <div className="flex w-full items-center justify-between px-5 pb-5">
              <div className="flex flex-col items-center">
                <p className="text-bold text-sm capitalize">
                  {brandName?.label}
                </p>
                <p className="text-bold text-sm capitalize text-default-400">
                  Brand
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-bold text-sm capitalize">{device?.model}</p>
                <p className="text-bold text-sm capitalize text-default-400">
                  Model
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-bold text-sm capitalize">
                  {device?.serialNumber}
                </p>
                <p className="text-bold text-sm capitalize text-default-400">
                  Serial Number
                </p>
              </div>
              <div className="flex flex-col items-center">
                <DeviceCondition device={device} />
                <p className="text-bold text-sm capitalize text-default-400">
                  Condition
                </p>
              </div>
              <Button
                color="primary"
                variant="light"
                onClick={() => setShowDetails(true)}
              >
                More details
              </Button>
            </div>
          </div>
          <AssignmentsList
            assignments={assignments}
            setAssignmentFormData={setAssignmentFormData}
            setSelectedAssignment={setSelectedAssignment}
            setDeleteAssignment={setDeleteAssignment}
          />
        </CardBody>
      </Card>

      {device.id && (
        <DevicesDetails
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          device={device}
        />
      )}

      <AssignmentDetails
        isOpen={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        assignment={selectedAssignment}
      />

      <TwoButtonsModal
        isOpen={!!deleteAssignment}
        onClose={() => setDeleteAssignment(null)}
        title="Delete assignment"
        description={`Are you sure to delete the assignment of Start Date: ${moment(
          deleteAssignment?.date
        ).format("MMMM Do YYYY")} for the device with Serial Number ${
          device?.serialNumber
        }?`}
        actionBtn={() => {}}
        closeText="Cancel"
        actionText="Delete"
      />

      <AssignmentForm
        isOpen={!!assignmentFormData}
        onClose={(assignment) => {
          if (assignment) {
            handleAddAssignment(assignment);
          }
          setAssignmentFormData(null);
        }}
        users={users}
        selectedAssignment={assignmentFormData}
      />
    </div>
  );
};

export default DeviceAssignmentsIndex;
