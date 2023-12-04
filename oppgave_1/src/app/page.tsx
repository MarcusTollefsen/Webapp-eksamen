import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/restapi", {
    method: "get",
  })
  const result = await response.json()

  return (
    <main>
      {JSON.stringify(result)}
      <Header />
      <Tasks>
        <Answer />
      </Tasks>
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
      <Progress/>
    </main>
  )
}
