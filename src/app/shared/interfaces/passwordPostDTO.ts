export interface PasswordPostDTO {
  userId: number | null;
  application: string;
  favorite: boolean;
  username: string;
  passphrase: string;
  website: string;
  tags: string[];
  notes: string;
  inBin: boolean;
  createdAt: string;
}
