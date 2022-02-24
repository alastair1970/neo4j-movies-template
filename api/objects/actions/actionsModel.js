const _ = require('lodash');
const Action = require('./actionsNeo4j');

const _singleActionWithDetails = function (record) {
  if (record.length) {
    const result = {};
    _.extend(result, new Action(record.get('action')));
    return result;
  } else {
    return null;
  }
};

//Query Functions
function manyActions(neo4jResult) {
  return neo4jResult.records.map(r => new Action(r.get('action')))
}

// get a single action by id
const createNewAction = function (session, userId, state) {
  var {description}=state;
  const query = [
    'MATCH (u:User)',
    'WHERE u.id = $userId',
    'CREATE (m:Action {description : $description} )<-[c:CREATED]-(u)',
    'SET',
    ' m.id=apoc.create.uuid()',
    ',c.created=TIMESTAMP()',
    ',m.created=TIMESTAMP()',
    'RETURN m as action',
  ].join('\n');
  return session.readTransaction(txc =>
      txc.run(query, {
        userId: userId,
        description: description,
      })
    )
    .then(result => {
      if (!_.isEmpty(result.records)) {
        return _singleActionWithDetails(result.records[0]);
      }
      else {
        throw {message: 'action not found', status: 404}
      }
    });
};

const setActionState = function (session, actionId, state) {
  var cypher='';
  for(var name in state) {
    cypher = cypher+"action."+name+"=$"+name+",";
  }
  cypher = cypher.substring(0, cypher.length - 1);
  const query = [
    'MATCH (action:Action {id: $actionId})',
    'SET',
    cypher,
    'RETURN action'
  ].join('\n');
  return session.writeTransaction(txc =>
    txc.run(query,{...state,actionId: actionId}
    )
  );
};

const deleteAction = function (session, actionId) {
  const query = [
    'MATCH (action:Action {id: $actionId})',
    'DETACH DELETE action',
    'RETURN COUNT(action) as d'
  ].join('\n');
  return session.writeTransaction(txc =>
    txc.run(query,{actionId: actionId})
  ).then(result => {
    if (!_.isEmpty(result.records)) {
      return result.records[0].get('d');
    } else {
      throw {message: 'action delete failed', status: 404}
    }
  });
;
};

// get a single action by id
const getById = function (session, actionId, userId) {
  const query = [
    'MATCH (action:Action {id: $actionId})',
    'OPTIONAL MATCH (action)<--(me:User {id: $userId})',
    'RETURN DISTINCT action',
  ].join('\n');
  return session.readTransaction(txc =>
      txc.run(query, {
        actionId: actionId,
        userId: userId
      })
    )
    .then(result => {
      if (!_.isEmpty(result.records)) {
        return _singleActionWithDetails(result.records[0]);
      }
      else {
        throw {message: 'action not found', status: 404}
      }
    });
};

// get all actions
const getAll = function (session,userId) {
  const query = [
    'MATCH (action:Action)<--(me:User {id: $userId})',
    'RETURN DISTINCT action',
  ].join('\n');
  return session.readTransaction(txc => (
      txc.run(query, {
        userId: userId
      })
      ))
    .then(r => manyActions(r));
};

// Get by date range
const getByDateRange = function (session, created, destroyed) {
  const query = [
    'MATCH (action:Action)',
    'WHERE action.created > $created AND action.destroyed < $destroyed',
    'RETURN action'
  ].join('\n');
  return session.readTransaction(txc =>
      txc.run(query, {
        created: parseInt(created || 0),
        destroyed: parseInt(destroyed || 0)
      })
    )
    .then(result => manyActions(result))
};

// export exposed functions
module.exports = {
  createNewAction: createNewAction,
  getById        : getById,
  setActionState : setActionState,
  deleteAction   : deleteAction,
  getAll         : getAll,
  getByDateRange : getByDateRange,
};
