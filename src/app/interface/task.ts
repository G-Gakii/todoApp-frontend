export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  isloading?: boolean;
}
