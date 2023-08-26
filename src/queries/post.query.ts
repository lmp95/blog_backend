import { PipelineStage } from 'mongoose';
import { paginationLimit, paginationSkip } from './common';

export function postListQuery({ match = {}, perPage, currentPage }: { match?: object; perPage: number; currentPage: number }): PipelineStage[] {
    return [
        {
            $match: match,
        },
        { $sort: { _id: -1 } },
        paginationSkip(perPage, currentPage),
        paginationLimit(perPage),
    ];
}
