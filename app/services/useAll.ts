import axios from "axios";

export interface DeleteProps {
  columnId?: string;
  boardId?: string;
  deleteAll?: true | false;
}

export const axiosC = axios.create({
  baseURL: "/api",
});

export class APIFunctions {
  constructor(public url: string) {}

  Get<T>() {
    return axiosC.get<T>(`/boards/${this.url}`).then((res) => res.data);
  }

  AddNew<T>(item: T) {
    return axiosC.post(`/boards/${this.url}`, item).then((res) => res.data);
  }

  Update<T>(data: T) {
    return axiosC.patch(`/boards/${this.url}`, data).then((res) => res.data);
  }

  Delete<T>(data: T) {
    return axiosC
      .delete(`/boards/${this.url}`, {
        data: { ...data },
      })
      .then((res) => res.data);
  }
}
