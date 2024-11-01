"use client";
import { Gender } from "@/app/userInfo/page";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

type UserType =
  | {
      id: number;
      name: string;
      email: string;
      address: string;
      photoBase64: string;
      studentNum: string;
      gender: Gender;
    }
  | undefined;
interface Props {}

type UserContextType = {
  user1: UserType;
  fetchUser: () => Promise<void>;
  visitNum: number;
  setVisitNum: (vistNum: number) => void;
  title: string;
  setTitle: (title: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  let storageTitle;
  if (typeof window !== "undefined") {
    // localStorage 사용 코드
    storageTitle = localStorage.getItem("title");
  }

  const [user, setUser] = useState<UserType>();
  const [visitNum, setVisitNum] = useState<number>(0);
  const [title, setTitle] = useState(storageTitle || "");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("qid");
      if (token) {
        const response = await axios.get("http://localhost:8000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        console.log("response.data", response.data);

        if (!response.data.id) {
          // localStorage.removeItem("qid");
          // window.location.reload();
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      localStorage.removeItem("qid");
      //   window.location.reload();
      // 에러 처리 (401 에러는 인터셉터에서 처리됨)
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user1: user, fetchUser, visitNum, setVisitNum, title, setTitle }}
    >
      {children}
    </UserContext.Provider>
  );
};
