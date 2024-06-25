"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [getId, setGetId] = useState();
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome </h1>
      <div className="flex flex-col mt-4">
        Get all materials
        <Button name={"GET /materials"} />
        enter id:{" "}
        <input
          className="mb-4 p-2 text-black"
          onChange={(e) => setGetId(e.target.value)}
        />{" "}
        <Button
          name={"GET /materials/:id"}
          onClickFunction={() => {
            router.push(`/materials/${getId}`);
          }}
        />
        Create new materials :
        <Button
          name={"POST /materials"}
          onClickFunction={() => {
            router.push("/form");
          }}
        />
        <Button name={"PUT /materials/:id"} />
        <Button name={"DELETE /materials/:id"} />
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
