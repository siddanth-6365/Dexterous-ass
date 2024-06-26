"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteMaterial, hotloadDb } from "@/apis";

export default function Home() {
  const [getId, setGetId] = useState();
  const [updateId, setUpdateId] = useState();
  const [deleteId, setDeleteId] = useState();

  useEffect(async () => {
    await hotloadDb();
  }, []);

  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">
        Welcome (click on buttons to get results){" "}
      </h1>
      <h1 className="text-1xl font-bold">
        Note: Server might take 50 sec to start (since free version){" "}
      </h1>
      <h1 className="text-1xl font-bold">
        Tip: get ids from Get all materials page{" "}
      </h1>
      <div className="mt-4">
        Get all materials:
        <Button
          name={"GET /materials"}
          onClickFunction={() => {
            router.push(`/materials`);
          }}
        />
        <div className="flex mt-4">
          <label htmlFor="getId">Enter id: </label>
          <input
            className=" h-8 text-black mr-4 "
            id="getId"
            onChange={(e) => setGetId(e.target.value)}
          />
          <Button
            name={"GET /materials/:id"}
            onClickFunction={() => {
              router.push(`/materials/${getId}`);
            }}
            className="ml-2"
          />
        </div>
        Create new materials :
        <Button
          name={"POST /materials"}
          onClickFunction={() => {
            router.push("/form");
          }}
        />
        <div className="flex mt-4">
          <label htmlFor="updateId">Update materials, Enter id:</label>
          <input
            className=" h-8 text-black mr-4 "
            id="updateId"
            onChange={(e) => setUpdateId(e.target.value)}
          />
          <Button
            name={"PUT /materials/:id"}
            onClickFunction={() => {
              router.push(`/form/${updateId}`);
            }}
            className="ml-2"
          />
        </div>
        <div className="flex mt-4">
          <label htmlFor="deleteId">Delete, Enter id:</label>
          <input
            className=" h-8 text-black mr-4 "
            id="deleteId"
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <Button
            name={"DELETE /materials/:id"}
            onClickFunction={async () => {
              try {
                if (!deleteId) {
                  alert("please enter id");
                }
                await deleteMaterial(deleteId);
                alert("deleted by id");
              } catch (err) {
                console.log("error while deleting", err);
                alert("error while deleting");
              }
            }}
            className="ml-2"
          />
        </div>
      </div>
    </main>
  );
}

function Button({ name, onClickFunction }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 p-4 mb-4 rounded"
      onClick={onClickFunction}
    >
      {name}
    </button>
  );
}
