import _ from 'lodash'
import { ROW_SELECT_SINGLE } from 'react-bootstrap-table-next';

export function paginate(items, pageNumber, pageSize) {
    const startIdx = (pageNumber - 1) * pageSize;
    return _(items).slice(startIdx).take(pageSize).value();
}