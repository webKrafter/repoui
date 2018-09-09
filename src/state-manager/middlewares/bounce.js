/**
 * prevents any entity that is neither a function or an action from the process
 */

export default ({ dispatch, getState }) => next => entity =>
   typeof entity === 'function' || ( typeof entity === 'object' && entity.type )
    ? next( entity )
    : entity;  