"use client"
type AthleteProps = {
  id: string;
  sport: string;
  gender: string;
};

export default function Athlete({ id, sport, gender }: AthleteProps) {
  return (
    <li className="flex gap-1 items-center">
      <input id={id} type="checkbox" className="cursor-pointer peer" />
      <label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
        {`${sport} (${gender})`}
      </label>
    </li>
  );
}
