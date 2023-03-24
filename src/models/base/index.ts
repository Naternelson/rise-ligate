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
import { ObjectSchema, ValidationResult } from "joi";

export class ModelBase<T extends object = {}> {
  static readonly collectionName: string = "";
  static get ref() {
    return collection(getFirestore(), this.collectionName);
  }
  static collectionQuery(
    ...contraints: QueryConstraint[]
  ): Query<DocumentData> {
    return query(this.ref, ...contraints);
  }
  validation?: ObjectSchema;
  attributes: T;
  collectionName: string = "";
  id?: string;
  get ref(): DocumentReference<DocumentData> {
    if (this.id) return doc(getFirestore(), this.collectionName, this.id);
    const ref = doc(collection(getFirestore(), this.collectionName));
    this.id = ref.id;
    return ref;
  }
  constructor(attributes: T) {
    this.attributes = attributes;
    if ("id" in attributes && typeof attributes.id === "string")
      this.id = attributes.id;
  }
  validate(): ValidationResult {
    if (!this.validation) return { value: this.attributes, error: undefined };
    return this.validation.validate(this.attributes);
  }
  throwError(message: string) {
    return new ModelError(this.collectionName, message)
  }
}
export class ModelError extends Error {
    name: string 
    message: string 
    constructor(name: string, message: string){
        super(message)
        this.message = message 
        this.name = name 
    }
}