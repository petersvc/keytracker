export interface Password {
  id: string;
  application: string;
  username: string;
  passphrase: string;
  website: string;
  notes: string;
  userId: string;
  folder: string;
  tags: string[];
  favorite: boolean;
  inBin: boolean;
  createdAt: Date;
  iconName: string;
}
