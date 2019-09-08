'use strict';

const control = {};

control.pagination = (page, pageSize) => {
    const offset = page * pageSize;
    const limit = offset + pageSize;
    return {
        offset,
        limit
    }
}

module.exports = control;