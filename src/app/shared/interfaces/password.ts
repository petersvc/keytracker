export interface Password {
  id: string;
  userId: string;
  application: string;
  favorite: boolean;
  username: string;
  passphrase: string;
  website: string;
  tags: string[];
  notes: string;
  inBin: boolean;
  createdAt: string;
  iconName: string;
}
