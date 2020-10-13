import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IDX_da03ffed3d54f7872792df358f", ["email"], { unique: true })
@Entity("tbl_user", { schema: "kim_test" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("int", { name: "photo_id" })
  photoId: number;

  @Column("varchar", { name: "uuid", length: 40 })
  uuid: string;

  @Column("varchar", { name: "name", length: 20 })
  name: string;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("datetime", {
    name: "last_login_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastLoginDate: Date;

  @Column("datetime", {
    name: "reg_dt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  regDt: Date;

  @Column("datetime", {
    name: "mod_dt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  modDt: Date;
}
