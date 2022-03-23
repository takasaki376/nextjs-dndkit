export type ListTodo = {
  id: string;
  task: string;
  userId: string;
  sortKey: number;
  dueDate: string;
  completeDate: string;
  isDone: boolean;
  createAt: string;
  updateAt: string;
};
  
export type PostTodo = {
  task: string;
  sortKey: number;
  dueDate: string;
  completeDate: string;
  isDone: boolean;
};

export type TodosState = {
  todos: ListTodo[];
  sourceContainer :Target | null;
  activeTarget:Target | null;
  orveTarget:Target | null;
  getTodos: () => void;
  setSourceContainer: (id :string) => void;
  findTarget: (id :string ,isActive :boolean) => void;
  taskDropOver: (id :string ,overId :string, strDate :string) => void;
  taskDropEnd: (id :string ,overId :string, strDate :string) => void;
};

export type Target ="today" | "nextday" | "other";