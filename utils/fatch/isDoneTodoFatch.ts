import { TodoType } from "@/type";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const isDoneTodoFatch = async ({
  id,
  isDone,
}: {
  id: number;
  isDone: boolean;
}) => {
  // http://localhost:8000/createTodo
  const token = localStorage.getItem("qid");
  if (token) {
    const response = await axios.patch(
      "http://localhost:8000/updateTodo",
      {
        isDone,
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};
