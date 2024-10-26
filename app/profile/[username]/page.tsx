"use client"

import { useParams } from "next/navigation"; 
import React from 'react'

const page = () => {
    const params = useParams()
    const username = params.username

  return (
    <div className="mt-20">{username}</div>
  )
}

export default page