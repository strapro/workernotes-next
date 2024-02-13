import { Database } from 'types/database.generated';

export type { Database } from 'types/database.generated';

export type Worker = Database['public']['Tables']['workers']['Row'] & {
	departments?: Database['public']['Tables']['departments']['Row'] | null;
	levels?: Database['public']['Tables']['levels']['Row'] | null;
};
