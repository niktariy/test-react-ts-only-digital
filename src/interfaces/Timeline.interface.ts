export type CategoryKey = 1 | 2 | 3 | 4 | 5 | 6;

export interface Category {
  key: CategoryKey;
  label: string;
}

export interface TimelineEvent {
  year: number;
  category: CategoryKey;
  description: string;
}

export interface TimelineData {
  title: string;
  categories: Category[];
  events: TimelineEvent[];
}
