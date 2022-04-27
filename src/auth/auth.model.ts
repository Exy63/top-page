import { Prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface AuthModel extends Base, TimeStamps {}
export class AuthModel {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}
