export const useSearchParams = jest.fn<
  URLSearchParams | null | undefined,
  never[],
  never
>(() => new URLSearchParams())
