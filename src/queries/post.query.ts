import { PipelineStage } from 'mongoose';
import { paginationLimit, paginationSkip } from './common';

export function postListQuery({ match = {}, perPage, currentPage }: { match?: object; perPage: number; currentPage: number }): PipelineStage[] {
    return [
        {
            $match: match,
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category',
            },
        },
        {
            $unwind: '$category',
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$author',
        },
        { $sort: { _id: -1 } },
        paginationSkip(perPage, currentPage),
        paginationLimit(perPage),
    ];
}

export function postDetailQuery({ match = {} }: { match?: object }): PipelineStage[] {
    return [
        {
            $match: match,
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category',
            },
        },
        {
            $unwind: '$category',
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$author',
        },
    ];
}
