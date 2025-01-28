import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    weekday: "long", // Nama hari (Senin, Selasa, dst.)
    day: "numeric", // Tanggal (1, 2, dst.)
    month: "long", // Nama bulan (Januari, Februari, dst.)
    year: "numeric", // Tahun (2025, dst.)
  });

  return formatter.format(date);
}

export interface SplitArrayResult<T> {
  numberElement: number;
  firstElement: T;
  middleElement?: Array<T>;
  lastElement?: Array<T>;
}

/**
 * Function  to split array into three parts
 * @type {string[]}
 */
export function split_array<T>(
  array: Array<T>,
  sumFirstAndLast: number,
): SplitArrayResult<T> {
  if (array.length < 1) return { numberElement: 0, firstElement: {} as T };
  else if (array.length === 1) {
    return { numberElement: 1, firstElement: array[0] };
  } else if (array.length <= sumFirstAndLast) {
    return {
      numberElement: array.length,
      firstElement: array[0],
      lastElement: array.slice(1), // Ambil semua elemen setelah elemen pertama
    };
  } else {
    return {
      numberElement: array.length,
      firstElement: array[0],
      middleElement: array.slice(1, -(sumFirstAndLast - 1)), // Elemen di tengah (tidak termasuk pertama dan terakhir)
      lastElement: array.slice(-(sumFirstAndLast - 1)), // Elemen terakhir
    };
  }
}

export function mapEnum<T extends object, R>(
  e: T,
  callback: (key: keyof T, value: T[keyof T]) => R,
): R[] {
  return Object.entries(e).map(([key, value]) =>
    callback(key as keyof T, value as T[keyof T]),
  );
}

// export function mapEnum<T>(
//   enumObject: T,
//   callback: (key: keyof T, value: T[keyof T]) => ReactNode,
// ): ReactNode[] {
//   return Object.keys(enumObject).map(([key, value]) =>
//     callback(key as keyof T, value as T[keyof T]),
//   );
// }
