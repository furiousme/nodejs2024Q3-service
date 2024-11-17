import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;

  @Column()
  @Exclude()
  version: number;

  @Column()
  @Exclude()
  createdAt: number;

  @Column()
  @Exclude()
  updatedAt: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
