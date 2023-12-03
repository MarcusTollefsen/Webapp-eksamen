"use client"

import React, { useEffect, useState } from "react"

import { generateUniqueId } from "@/app/hjelp/page"

export default function CreateCustomer() {
  const [athlete, setAthlete] = useState({
    id: "",
    gender: "",
    sport: "",
  })

  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!athlete.id) {
      const newId = generateUniqueId()
      const newAthleteData = { ...athlete, id: newId }
      setAthlete(newAthleteData)
      void saveAthleteData(newAthleteData) 
      setMessage(`Utøveren er registrert med ID: ${newId}`)
    } else {
      setMessage(`Utøveren er allerede registrert med ID: ${athlete.id}`)
    }
    setShowMessage(true)
  }

  const resetForm = () => {
    setAthlete({ id: "", gender: "", sport: "" })
    setMessage("")
    setShowMessage(false)
  }

  const isFormValid = athlete.gender !== "" && athlete.sport !== ""
  const saveAthleteData = async (athleteData: {
    id: string
    gender: string
    sport: string
  }) => {
    try {
      const response = await fetch("http://localhost:3000/api/athlete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(athleteData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      
    } catch (error) {
      
      console.error("Det oppstod en feil under lagring av utøverdata:", error)
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <h1 className="mb-2 block text-xl font-bold text-gray-700">
          Opprett Utøver
        </h1>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="gender"
          >
            Kjønn:
          </label>
          <select
            id="gender"
            value={athlete.gender} 
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            onChange={(e) => {
              setAthlete({ ...athlete, gender: e.target.value })
            }}
          >
            <option value="">Velg kjønn</option>
            <option value="mann">Mann</option>
            <option value="kvinne">Kvinne</option>
            <option value="annet">Annet</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="sport"
          >
            Sport:
          </label>
          <select
            id="sport"
            value={athlete.sport} 
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            onChange={(e) => {
              setAthlete({ ...athlete, sport: e.target.value })
            }}
          >
            <option value="">Velg sport</option>
            <option value="løp">Løp</option>
            <option value="sykkel">Sykkel</option>
            <option value="ski">Ski</option>
            <option value="triathlon">Triathlon</option>
            <option value="svømming">Svømming</option>
            <option value="styrke">Styrke</option>
            <option value="annet">Annet</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            disabled={!isFormValid}
          >
            Legg til Utøver
          </button>
          <button
            type="button"
            className="focus:shadow-outline mt-4 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
            onClick={resetForm}
          >
            Ny
          </button>
        </div>
        {showMessage && (
          <div
            className="relative mt-4 rounded border-b border-t border-green-500 bg-green-100 px-4 py-3 text-green-700"
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}
      </form>
    </div>
  )
}
