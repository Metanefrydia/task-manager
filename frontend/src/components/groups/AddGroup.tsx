import React, { useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import "./group.css";
import AuthenticationService, { UserDetails } from "../../services/service";

interface userSelect {
  name: string | undefined;
  _id: string | undefined;
}

const AddGroup = (props: any) => {
  const curentUser: UserDetails | null = AuthenticationService.getUserDetails();
  const [name, setName] = useState({
    name: "",
  });
  // @ts-ignore
  const [members, setMembers] = useState<UserDetails[]>([curentUser]);

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setName({ ...name, [prop]: event.target.value });
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

    AuthenticationService.addGroup(groupData);
    window.location.reload();
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
    <Box
      style={{
        padding: "6px",
        marginTop: "10px",
        marginLeft: "4%",
        marginRight: "4%",
        border: "1px solid #DADADA ",
      }}
      display="flex"
      justifyContent="space-between"
    >
      <TextField
        id="grup-name"
        label="nazwa"
        variant="outlined"
        placeholder="Nazwa grupy..."
        value={name.name}
        onChange={handleChange("name")}
      />

      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={members}
        onChange={handleMembers}
        input={<Input id="select-multiple-chip" />}
        required
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
        {props.users.map((user: any) => {
          // @ts-ignore
          if (user._id != curentUser._id) {
            return (
              <MenuItem key={user._id} value={user}>
                {user.name}
              </MenuItem>
            );
          }
        })}
      </Select>

      <div>
        <IconButton aria-label="delete">
          <AddIcon
            style={{ color: "#03A9F4" }}
            fontSize="large"
            onClick={onAdd}
          />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon
            style={{ color: "red" }}
            fontSize="large"
            type="submit"
            onClick={props.cancelAdd}
          />
        </IconButton>
      </div>
    </Box>
  );
};

export default AddGroup;
