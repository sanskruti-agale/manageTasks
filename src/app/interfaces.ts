export interface Task {
    id: any;
    name: string | null;
    status: string | null;
    description: string | null;
  }

  export interface User {
    email: string;
    name: string;
    tasks: Task[];
    password: string;
    id: string;
  }
  