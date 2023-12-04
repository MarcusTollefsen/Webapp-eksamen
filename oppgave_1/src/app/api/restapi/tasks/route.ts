

import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type Task } from "@/types"

const tasks: Task[] = [
  {
    id: "124",
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    data: "1|1",
  },
  {
    id: "123",
    text: "Skriv resultatet av regneoperasjonen",
    data: "9|2",
    type: "add",
  },
  {
    id: "234",
    text: "Skriv resultatet av regneoperasjonen",
    data: "3|2",
    type: "add",
  },
  {
    id: "356",
    text: "Skriv resultatet av regneoperasjonen",
    data: "3|2",
    type: "multiply",
  },

]


const answers = new Map<Task["id"], { attempts: number }>()

export function GET(request: NextRequest) {
  const countParam = request.nextUrl.searchParams.get("count");
  const count = countParam ? parseInt(countParam, 10) : 10;
  if (!count || isNaN(count) || count < 1 || count > 10)
    return NextResponse.json({ success: false, error: "Invalid count" });

  const filteredTasks = tasks.slice(0, count);
  return NextResponse.json({ success: true, data: filteredTasks }, { status: 200 });
}


