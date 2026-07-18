export type ClassValue = string | number | false | null | undefined | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ');
}
