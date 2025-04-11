import type { ReactNode } from 'react';

export interface PageContainerProps {
  children: ReactNode;
}

export interface PageContentProps {
  children: ReactNode;
}

export interface Task {
  _id: string;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  images: [string];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface TaskData {
  tasks: Array<Task>;
}

export interface ContextProps {
  isLoading?: boolean;
  isError?: boolean;
  data?: TaskData;
  refetchTaskData?: () => void;
}

export interface ContextProviderProps {
  children: ReactNode;
}

export interface TaskCardProps {
  task: Task;
}

export interface NewTask {
  title: string;
  description: string;
  images: Array<string>;
}

export interface CreateNewTaskProps {
  task: NewTask;
}

export interface UpdatedTask {
  id: string;
  title: string;
  description: string;
  images: Array<string>;
}

export interface UpdateTaskFormProps {
  task: UpdatedTask;
  onClose: () => void;
}

export interface UpdateTaskProps {
  updatedTask: UpdatedTask;
}

export interface DeleteTaskProps {
  taskId: string;
}

export interface ChangeTaskCompletionProps {
  taskId: string;
}
