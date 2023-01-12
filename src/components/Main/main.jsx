import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  selectToDOList,
  removeTask,
  changeCheckedStatus,
} from "../../features/toDoList/toDoListSlice";
const Main = () => {
  const tasksToRender = useSelector(selectToDOList);
  const [toDoText, setToDoText] = useState("");
  const dispatch = useDispatch();
  return (
    <div style={{ textAlign: "center" }}>
      <TextFieldStyled
        id="standard-basic"
        label="Your task"
        value={toDoText}
        variant="standard"
        onChange={(event) => {
          event.target.value.length !== 30 && setToDoText(event.target.value);
        }}
      />
      <FabStyled
        variant="extended"
        className="addButton"
        onClick={() => {
          setToDoText("");
          dispatch(addTask(toDoText));
        }}
        disabled={toDoText.trim() === "" ? true : false}
      >
        {" "}
        Add
      </FabStyled>
      <ul>
        {tasksToRender.map((el, index) => {
          return (
            <li
              id={index}
              key={`${el.text}_${index}`}
              className={el.isDone ? "checked" : "unchecked"}
              onClick={(event) => {
                event.target.type !== "button" &&
                  event.target.type !== undefined &&
                  dispatch(changeCheckedStatus(index));
              }}
            >
              {el.text}
              <IconButtonStyled
                aria-label="delete"
                id={index}
                onClick={() => dispatch(removeTask(index))}
              >
                <DeleteIconStyled id={index}></DeleteIconStyled>
              </IconButtonStyled>
            </li>
          );
        })}
      </ul>
      {console.log(tasksToRender)}
    </div>
  );
};
const FabStyled = styled(Fab)(() => ({
  margin: 8,
  top: 30,
}));

const TextFieldStyled = styled(TextField)(() => ({
  margin: 8,
  backgroundColor: "rgba(0, 0, 0, 0)",
  top: 30,
  marginBottom: 55,
}));
const IconButtonStyled = styled(IconButton)(() => ({
  float: "right",
  bottom: 9,
}));
const DeleteIconStyled = styled(DeleteIcon)(() => ({
  float: "right",
  color: "black",
}));

export default Main;
