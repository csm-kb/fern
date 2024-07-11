/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedPagination from "../../../../index";

/**
 * @example
 *     {
 *         pagination: {
 *             cursor: "string"
 *         }
 *     }
 */
export interface ListUsersBodyCursorPaginationRequest {
    /**
     * The object that contains the cursor used for pagination
     * in order to fetch the next page of results.
     *
     */
    pagination?: SeedPagination.WithCursor;
}