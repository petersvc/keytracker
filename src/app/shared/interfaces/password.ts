export interface Password {
  id: number | null;
  userId: number | null;
  application: string;
  favorite: boolean;
  username: string;
  website: string;
  tags: string[];
  notes: string;
  inBin: boolean;
  createdAt: string;
}
