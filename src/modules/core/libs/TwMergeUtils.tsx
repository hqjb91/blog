import { ClassProp } from 'class-variance-authority/types';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const twcx = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

/**
 *
 * @param cvaInstance the cva function to use
 * @returns a function that takes the variants and className and returns the merged classnames
 */
// eslint-disable-next-line no-unused-vars
export const twCVA = <T extends (props: ClassProp | undefined) => string>(
  cvaFn: T,
) => {
  return (variants?: Parameters<T>[0], ...classList: ClassValue[]) =>
    twcx(cvaFn(variants), ...classList);
};
