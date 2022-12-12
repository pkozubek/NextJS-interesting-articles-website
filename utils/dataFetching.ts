import ToastMessage from "../components/Toast";
import { ToastType } from "../types/toast";

export function getEndpointUrl() {
  return "http://localhost:3000/api";
}

export const fetcher = (url: string) =>
  fetch(`${getEndpointUrl()}/${url}`)
    .then((res) => res.json())
    .catch(() => {
      ToastMessage({
        message: "Something went wrong",
        type: ToastType.ERROR,
      });
    });
