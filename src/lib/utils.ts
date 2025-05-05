
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea un número como precio en pesos argentinos (ARS)
 * @param amount - Valor a formatear
 * @returns String formateado (ej: "$1.234,56")
 */
export function formatArsPrice(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Formatea una fecha según el formato argentino
 * @param date - Fecha a formatear
 * @returns String formateado (ej: "25/05/2023")
 */
export function formatArDate(date: Date): string {
  return new Intl.NumberFormat('es-AR').format(date.getDate()) + '/' +
         new Intl.NumberFormat('es-AR').format(date.getMonth() + 1) + '/' +
         new Intl.NumberFormat('es-AR').format(date.getFullYear());
}
