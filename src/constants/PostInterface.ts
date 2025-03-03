export interface ProfileInterface {
  id?: string;
  name: string;
}

export interface PostInterface {
  id: number;
  user_id: string;
  content: string;
  images: string[] | null;
  created_at: Date;
  updated_at: Date | null;
  profiles: ProfileInterface | null;
}
