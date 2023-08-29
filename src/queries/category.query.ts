import { PipelineStage } from 'mongoose';
import { paginationLimit } from './common';

export function categoryListQuery({ limit = 10 }: { limit: number }): PipelineStage[] {
    return [
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'category',
                as: 'posts',
                pipeline: [{ $match: { status: 'Published' } }],
            },
        },
        {
            $set: {
                posts: {
                    $size: '$posts',
                },
            },
        },
        { $sort: { posts: -1 } },
        paginationLimit(limit),
    ];
}
