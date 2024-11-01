import { TodoType } from "@/type";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const removeTodosFatch = async ({ Id }: { Id: number }) => {
  // http://localhost:8000/createTodo
  const token = localStorage.getItem("qid");
  if (token) {
    const response = await axios.delete("http://localhost:8000/removeTodo", {
      data: { id: Id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
