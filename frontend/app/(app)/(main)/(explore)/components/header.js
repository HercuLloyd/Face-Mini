'use client'
import { useState } from "react"

export default function Header({createButton}) {
    return (
        <div className="flex justify-center items-center sticky top-0">
            <div className="h-20 w-96 bg-white border-b-2 border-stone-400">
                <div className="flex items-center justify-between h-full">
                    <h1 className="text-2xl font-medium text-">EXPLORE</h1>
                    <button 
                    className="px-2 py-2 bg-green-600 rounded-md text-white"
                    onClick={createButton}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}