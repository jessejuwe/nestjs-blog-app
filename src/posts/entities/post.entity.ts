import { Column, Entity, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne, ManyToOne, ManyToMany } from 'typeorm';

import { PostStatus } from '../enums/postStatus.enum';
import { PostType } from '../enums/postType.enum';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/users/entities/user.entity';

/**
 * Post Entity
 * @description Schema for Post Table in Database
 * @property {number} id - Post ID
 * @property {string} title - Post title
 * @property {PostType} postType - Post type
 * @property {string} slug - Post slug
 * @property {PostStatus} status - Post status
 * @property {string} content - Post content
 * @property {string} schema - Post schema
 * @property {string} featuredImageURL - Post featured image URL
 * @property {Date} publishOn - Post publish date
 * @property {string[]} tags - Post tags
 * @property {CreatePostMetaOptionsDto[]} metaOptions - Post meta options
 */
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar', length: 512, nullable: false })
  title: string;

  @Column({ type: 'enum', enum: PostType, nullable: false, default: PostType.POST }) // prettier-ignore
  postType: PostType;

  @Column({ type: 'varchar', length: 256, nullable: false, unique: true })
  slug: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    nullable: false,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Column({ type: 'text', nullable: true, default: null })
  content?: string;

  @Column({ type: 'text', nullable: true, default: null })
  schema?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true, default: null })
  featuredImageURL: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  publishOn?: Date;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable()
  tags?: Tag[];

  @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post, {
    cascade: true,
    eager: true,
  }) // ALTERNATIVE: to relations in service
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;
}
