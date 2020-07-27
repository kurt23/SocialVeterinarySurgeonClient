import { AnimalType } from './AnimalType';

export interface Pet {
    id?: number;
    ownerId: number;
    name: string;
    type: AnimalType;
  }

