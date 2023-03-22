import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  Query,
  query,
  QueryConstraint
} from "firebase/firestore";
import { ObjectSchema } from "joi";

export class ModelBase<T extends object = {}> {
  static readonly collectionName: string = "";
  static get ref() {
    return collection(getFirestore(), this.collectionName);
  }
  static collectionQuery(...contraints: QueryConstraint[]):Query<DocumentData>{
    return query(this.ref, ...contraints)
  }
  validation?: ObjectSchema;
  attributes: T;
  collectionName: string = "";
  id?: string;
  get ref():DocumentReference<DocumentData> {
    if (this.id) return doc(getFirestore(), this.collectionName, this.id);
    const ref = doc(collection(getFirestore(), this.collectionName));
    this.id = ref.id;
    return ref;
  }
  constructor(attributes: T) {
    this.attributes = attributes;
    if("id" in attributes && typeof attributes.id === "string") this.id = attributes.id
  }
  validate() {
    if (!this.validation) return this.attributes;
    return this.validation.valid(this.attributes);
  }
}
