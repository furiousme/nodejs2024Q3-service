import { Exclude } from 'class-transformer';

export class Artist {
  id: string;

  name: string;

  grammy: boolean;

  @Exclude()
  updatedAt: number;

  @Exclude()
  createdAt: number;

  @Exclude()
  version: number;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
