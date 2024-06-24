"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome </h1>
      <div className="flex flex-col mt-4">
        <Button name={"GET /materials"} />
        <Button name={"GET /materials/:id"} />
        <Button name={"POST /materials"} />
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
