import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null;

  @Exclude()
  @Column()
  version: number;

  @Exclude()
  @Column()
  createdAt: number;

  @Exclude()
  @Column()
  updatedAt: number;

  constructor(partial: Partial<Album>) {
    return Object.assign(this, partial);
  }
}
