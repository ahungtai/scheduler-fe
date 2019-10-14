import { StoreNode } from '@cui/core';
import { JobKind } from 'ts/data/entity/entity';

// Job 類型
export const JobKindsNode = new StoreNode<JobKind[]>({
    id: 'JobKinds',
    cache: true
});

