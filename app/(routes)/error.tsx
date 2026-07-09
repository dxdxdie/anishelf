"use client"

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
    useEffect(() => {
      console.error(error)
  }, [error])
    return (
      <>
            <p>Error: {error.message}</p>
            <button onClick={() => reset()} className="cursor-pointer border border-gray-400">Refresh button</button>
      </>
      )
}
