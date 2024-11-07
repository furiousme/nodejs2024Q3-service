export class Artist {
  id: string;

  name: string;

  grammy: boolean;

  updated_at: string;

  created_at: string;

  version: number;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
