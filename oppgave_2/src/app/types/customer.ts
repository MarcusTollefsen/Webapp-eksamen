export type Activity = {
  id: string;
  date: string;
  name?: string;
  tags: string[];
  questions: Question[];
  intervals: Interval[];
  goalId?: string;
}

export type Question = {
  id: string;
  question: string;
  type: string;
}

export type Interval = {
  id: string;
  duration: number;
  intensity: number;
}

export type Athlete = {
  id: string;
  userId: string;
  gender: string;
  sport: string;
  meta: {
    heartrate: number;
    watt: number;
    speed: number;
  };
  activities: Activity[];


}
export type ApiResponse = {
  pages: number;
  success: boolean;
  hasMore: boolean;
  page: number;
  data: Athlete[];
};

export type Competition = {
  name: string;
  date: string; 
  location: string;
  goal: string;
  type: string;
  priority: 'A' | 'B' | 'C';
  comments: string;
}