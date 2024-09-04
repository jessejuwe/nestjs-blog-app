import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';

import { Post } from 'src/posts/entities/post.entity';

/**
 * User Entity
 * @description User Entity
 * @column id: User ID {number}
 * @column firstName: User first name {string}
 * @column lastName: User last name {string}
 * @column email: User email {string}
 * @column password: User password {string}
 * @column isAuth: User authentication status {boolean}
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  readonly firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: true, default: null })
  lastName?: string;

  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  readonly email: string;

  @Column({ type: 'varchar', length: 96, nullable: true, default: null })
  @Exclude()
  password?: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  @Exclude()
  googleId?: string;

  @OneToMany(() => Post, (posts) => posts.author)
  posts: Post[];
}
