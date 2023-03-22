import { deleteDoc, doc, getFirestore, setDoc, WriteBatch } from "firebase/firestore";
import Joi from "joi";
import { ModelBase } from "../base";
import { HumanSchema, Humantype } from "../helpers";

export const userTitleOptions = [
  "unknown",
  "bishop",
  "1st-counselor",
  "2nd-counsolor",
  "president",
  "1st-president",
  "2nd-president",
  "ward-clerk",
  "stake-clerk",
  "ward-secretary",
  "stake-secretary",
  "ward-position",
  "stake-position",
] as const;

export const UserSchema = Joi.object({
  ...HumanSchema,
  uid: Joi.string().required(),
  title: Joi.string()
    .trim()
    .valid([...userTitleOptions])
    .default(userTitleOptions[0]),
});

export type UserType = Humantype & {
  uid?: string;
  title?: typeof userTitleOptions[number];
};


export class UserModel extends ModelBase<UserType> {
    static collectionName: string = "users";
    validation: Joi.ObjectSchema = UserSchema
    collectionName = "users"
    add(batch?: WriteBatch){
        const {error, value} = this.validation.validate(this.attributes)
        if(error) throw new Error("Failed Validation")
        const d = doc(getFirestore(), this.collectionName, value.uid)
        if(batch) return batch.set(d, value)
        else return setDoc(d, value) 
    }
    update(batch?:WriteBatch){
        return this.add(batch)
    }
    delete(batch?:WriteBatch){
        const uid = this.attributes.uid
        if(!uid) throw new Error("UID not provided")
        const d = doc(getFirestore(), "users", uid) 
        if(batch) batch.delete(d)
        else return deleteDoc(d)
    }
}


