"use client";
import resizeFile from "@/utils/resizeFil";
import { UserContext } from "@/utils/userContext";
import axios from "axios";
import { time } from "console";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

type InputDataType = {
  name: string;
  address: string;
  studentNum: string;
  photoBase64: string;
  gender: Gender;
};

const UserInfo: React.FC = () => {
  const [resizedImage, setResizedImage] = useState<string>();
  const [profile, setProfile] = useState<string>();
  const ctx = useContext(UserContext);
  const [inputData, setInputData] = useState<InputDataType>({
    name: "",
    address: "",
    studentNum: "",
    photoBase64: "",
    gender: Gender.MALE,
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const image = await resizeFile(file);
        setResizedImage(image);
        setInputData((prev) => ({ ...prev, photoBase64: image }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("qid");
      const response = await axios.patch(
        "http://localhost:8000/updateUser",
        inputData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setResizedImage(undefined);
        setProfile(inputData.photoBase64);
        console.log("Update successful:", response.data);
      } else {
        throw new Error("Failed to update user info");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (ctx?.user1) {
      setInputData({
        name: ctx.user1.name || "",
        address: ctx.user1.address || "",
        studentNum: ctx.user1.studentNum || "",
        photoBase64: ctx.user1.photoBase64 || "",
        gender: ctx.user1.gender || Gender.MALE,
      });
      setProfile(ctx.user1.photoBase64);
    }
  }, [ctx?.user1]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-220px)]">
      <div className="text-center text-[2rem] font-extrabold mt-12">
        Information
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 justify-center items-center text-slate-800">
          <div className="text-white">사용자정보</div>

          <div>
            <div className="flex gap-4">
              <div className="text-white">이름</div>
              <input
                className="text-slate-800 w-[20rem]"
                type="text"
                name="name"
                value={inputData.name || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div className="flex gap-4">
              <div className="text-white">성별</div>
              <select
                className="text-slate-800 w-[20rem]"
                name="gender"
                value={inputData.gender}
                onChange={handleInputChange}
              >
                {Object.values(Gender).map((item) => (
                  <option key={item} value={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </option>
                ))}
                {/* <option key="male" value="male">
                  남성
                </option>
                <option key="female" value="female">
                  여자
                </option>
                <option key="other" value="other">
                  그 외
                </option> */}
              </select>
            </div>
          </div>

          <div>
            <div className="flex gap-4">
              <div className="text-white">주소</div>
              <input
                className="text-slate-800 w-[20rem]"
                type="text"
                value={inputData.address || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div className="flex gap-4">
              <div className="text-white">학생증 번호</div>
              <input
                className="text-slate-800 w-[20rem]"
                type="text"
                name="studentNum"
                value={inputData.studentNum || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {resizedImage ? (
            <div className="">
              <picture>
                <img src={resizedImage} alt="Resized preview" />
              </picture>
            </div>
          ) : (
            <picture className={`${profile || "hidden"}`}>
              <img src={profile} alt="profile preview" />
            </picture>
          )}
          <div className="flex">
            <div className="flex gap-10">
              <label htmlFor="file">
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                  프로필 사진변경
                </div>
              </label>
              {resizedImage && (
                <button
                  className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    setInputData((prev) => ({
                      ...prev,
                      photoBase64: profile || "",
                    }))
                  }
                >
                  복구
                </button>
              )}
            </div>

            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
