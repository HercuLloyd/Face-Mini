"use client";
import { useState } from "react";

export default function Header({ createButton }) {
  return (
    <div className="sticky top-0 flex items-center justify-center">
      <div className="h-20 w-full border-b-2 border-stone-400 bg-white sm:w-96">
        <div className="flex h-full items-center justify-between">
          <h1 className="text- text-2xl font-medium">EXPLORE</h1>
          <button
            className="rounded-md bg-green-600 px-2 py-2 text-white"
            onClick={createButton}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
