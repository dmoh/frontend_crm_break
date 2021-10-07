/*export interface Tag
    {
      id?: string;
      title?: string;
    }*/

export class Task
    {
      id: string;
      //type: 'task' | 'work';
      title: string;
      notes: string;
      completed: boolean;
      //edit: boolean;
      tags: string ;
      priority: string;
      date: string;
      //modif: false = false;
      //dueDate: string | null;
      //priority: 0 | 1 | 2;
      //tags: string[];
      //order: number;
    }
