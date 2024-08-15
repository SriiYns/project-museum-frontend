import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
}

export function formatDate(value) {
    const date = new Date(value);
    return date.toLocaleDateString("id-ID", {
        dateStyle: "medium",
    });
}
