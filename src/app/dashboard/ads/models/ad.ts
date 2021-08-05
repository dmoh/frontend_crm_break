export class Ad {
  public readonly id: number;
  title: string;
  amount: string;
  description: string;
  showAmount: boolean;
  published?: boolean;
  assets?: string;
  comment?: string;
  tags?: string;
  image: string;
}
