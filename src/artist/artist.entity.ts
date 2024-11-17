import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Column()
  @Exclude()
  updatedAt: number;

  @Column()
  @Exclude()
  createdAt: number;

  @Column()
  @Exclude()
  version: number;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
