"use client"

// pages/index.tsx
import React, { useEffect, useState } from "react"
import Link from "next/link"

type Activity = {
  id: string
  userId: string
  gender: string
  sport: string
  tags?: string[]
  questions?: { id: string; question: string; type: string }[]
  intervals?: { id: string; duration: number; intensity: number }[]
  goalId?: string
}

type ApiResponse = {
  pages: number
  success: boolean
  hasMore: boolean
  page: number
  data: Athlete[]
}

type Athlete = {
  id: string
  userId: string
  gender: string
  sport: string
  meta: {
    heartrate: number
    watt: number
    speed: number
  }
  activities: Activity[]
}

const DashboardPage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://webapp-api.vercel.app/api/users?page=1`,
        )
        const data: ApiResponse = await response.json()

        setAthletes(data.data)
        setTotalPages(data.pages)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    void fetchData()
  }, [currentPage])

  const goToNextPage = () => {
    setCurrentPage((current) => Math.min(current + 1, totalPages))
  }
  const goToPreviousPage = () => {
    setCurrentPage((current) => Math.max(current - 1, 1))
  }

  return (
    <div>
      <h1>Utøvere Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Kjønn</th>
            <th>Sport</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td>
                <Link href={`/athletes/${athlete.userId}`} passHref>
                  <span style={{ color: "blue", cursor: "pointer" }}>
                    {athlete.userId}
                  </span>
                </Link>
              </td>
              <td>{athlete.gender}</td>
              <td>{athlete.sport}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Forrige
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Neste
        </button>
        <p>
          {currentPage}av{totalPages}
        </p>
      </div>
    </div>
  )
}

export default DashboardPage