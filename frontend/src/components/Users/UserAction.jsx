import { Tooltip, Button } from "@nextui-org/react";
import { EditIcon } from "../common/customIcons/EditIcon";

const UserActions = ({ user, onEditUser, onViewDetails, onToggleStatus }) => {
  return (
    <div className="relative flex items-center justify-center gap-4">

      <Tooltip content="Edit User">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => onEditUser(user)}
        >
          <EditIcon />
        </span>
      </Tooltip>

        <Button
          auto
          color={user.active ? "danger" : "success"}
          size="sm"
          onPress={() => onToggleStatus(user.id)}
          style={{ minWidth: "100px", textAlign: "center" }}
        >
          {user.active ? "Deactivate" : "Activate"}
        </Button>
    </div>
  );
};

export default UserActions;
