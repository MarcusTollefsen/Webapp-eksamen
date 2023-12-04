"use client"
import React, { type FormEvent } from 'react';

export default function Page() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    
    const id = formData.get('id');
    const gender = formData.get('gender');
    const sport = formData.get('sport');

    try {
      const response = await fetch('/api/athletes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, gender, sport }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      
    } catch (error) {
      
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <h1 className="mb-2 block text-xl font-bold text-gray-700">
          Opprett Utøver
        </h1>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="id">
            ID:
          </label>
          <input
            type="text"
            name="id"
            id="id"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="gender"
          >
            Kjønn:
          </label>
          <select
            id="gender"
            name="gender"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"

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
            name="sport"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"

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
          >
            Legg til Utøver
          </button>
          <button
            type="button"
            className="focus:shadow-outline mt-4 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none">


          </button>
        </div>
      </form>
    </div>
  );
}