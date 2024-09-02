import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SpeciesProps {
  SpeciesID: number,
  SpeciesName: string
}

export interface BreedProps {
  BreedID: number,
  BreedName: string,
  Species: string,
}


export interface OwnerProps {
  OwnerID: number,
  Name: string,
  ContactDetails: string,
  Address: string,
}