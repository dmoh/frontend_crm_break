/*export interface Tag
    {
      id?: string;
      title?: string;
    }*/

export class Task
    {
      id: any;
      type: 'task' | 'work';
      title: string;
      notes: string;
      completed: boolean;
      edit: boolean;
      tags: string ;
      priority: string;
      date: string;
      //dueDate: string | null;
      //priority: 0 | 1 | 2;
      //tags: string[];
      //order: number;
    }
