import React, { useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import "./group.css";
import AuthenticationService, {
  UserDetails,
} from "../../services/AuthenticationService";
import GroupService from "../../services/GroupsService";
import { useSnackbar } from "notistack";

const AddGroup = (props: any) => {
  const currentUser: UserDetails | null =
    AuthenticationService.getUserDetails();
  const [name, setName] = useState({
    name: "",
  });
  // @ts-ignore
  const [members, setMembers] = useState<UserDetails[]>([currentUser]);
  const [errors, setErrors] = React.useState<any>();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setName({ ...name, [prop]: event.target.value });

      if (prop === "name") {
        validateGroupName(event.target.value);
      }
    };

  const validateGroupName = (value: any) => {
    setErrors({ ...errors, name: "" });
    if (value.length === 0) {
      setErrors({ ...errors, name: "Nazwa grupy jest wymagana." });
    } else if (value.length > 15) {
      setErrors({
        ...errors,
        name: "Max. 15 znaków.",
      });
    }
  };

  const handleMembers = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMembers(event.target.value as UserDetails[]);
  };

  const onAdd = () => {
    const groupData = {
      name: name.name,
      members: members.map((user) => {
        // @ts-ignore
        return user._id;
      }),
    };

    if (name.name !== "") {
      GroupService.addGroup(groupData).then(
        () => enqueueSnackbar("Dodano grupę!"),
        () => enqueueSnackbar("Wystąpił błąd. Spróbuj dodać grupę ponownie.")
      );
      window.location.reload();
    } else {
      validateGroupName(name.name);
    }
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <Box className={"inRowElement"}>
      <TextField
        label="Nazwa grupy"
        variant="outlined"
        placeholder="Nazwa grupy"
        value={name.name}
        onChange={handleChange("name")}
        error={Boolean(errors?.name)}
        helperText={errors?.name}
      />

      <Select
        multiple
        value={members}
        onChange={handleMembers}
        input={<Input className={"addGroupSelect"} />}
        variant="filled"
        renderValue={(selected) => (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {(selected as UserDetails[]).map((value) => (
              <Chip
                key={value._id}
                label={value.name}
                style={{ margin: "2px" }}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {props.users.forEach((user: any) => {
          // @ts-ignore
          if (user._id !== currentUser._id) {
            return (
              <MenuItem key={user._id} value={user}>
                {user.name}
              </MenuItem>
            );
          }
        })}
      </Select>

      <div>
        <IconButton
          aria-label="add"
          onClick={onAdd}
          disabled={Boolean(errors?.name)}
        >
          <AddIcon
            style={{ color: Boolean(errors?.name) ? "#979797" : "#03A9F4" }}
            fontSize="large"
          />
        </IconButton>
        <IconButton aria-label="delete" onClick={props.cancelAdd}>
          <DeleteIcon style={{ color: "red" }} fontSize="large" type="submit" />
        </IconButton>
      </div>
    </Box>
  );
};

export default AddGroup;
