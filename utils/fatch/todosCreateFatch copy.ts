import { TodoType } from "@/type";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const createTodosFatch = async ({ title }: { title: string }) => {
  // http://localhost:8000/createTodo
  const token = localStorage.getItem("qid");
  if (token) {
    const response = await axios.post(
      "http://localhost:8000/createTodo",
      {
        title,
        isDone: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.todo;
  }
};
