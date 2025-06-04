export enum courses {
  'seven-day-program',
  'personal-couselling',
}

export interface Course {
  id: string;
  title: string;
  description: string;
  courseFeature: { feature: string }[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  previewURL: string | null;
  thumbnailURL: string;
}
