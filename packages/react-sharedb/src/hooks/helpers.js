import React, { useMemo, useLayoutEffect, useContext } from 'react'
import $root from '@startupjs/model'
import { useQuery, useLocal } from './types'

export const emit = $root.emit.bind($root)

export function useModel (...args) {
  return useMemo(() => $root.scope(...args), [...args])
}

export function useOn (...args) {
  useLayoutEffect(() => {
    let [eventName] = args
    let listener = $root.on(...args)
    return () => {
      $root.removeListener(eventName, listener)
    }
  })
}

export function useEmit () {
  return emit
}

export function useQueryIds (collection, ids = [], options = {}) {
  let [, $items, ready] = useQuery(collection, { _id: { $in: ids } })
  if (!ready) return [undefined, $items, ready]
  if (options.reverse) ids = ids.slice().reverse()
  let items = ids.map(id => $root.get(`${collection}.${id}`)).filter(Boolean)
  return [items, $items, ready]
}

export function useQueryDoc (collection, query) {
  query = {
    ...query,
    $limit: 1
  }
  if (!query.$sort) query.$sort = { createdAt: -1 }
  let [items = [], , ready] = useQuery(collection, query)
  let itemId = items[0] && items[0].id
  let $item = useMemo(
    () => {
      if (!itemId) return
      return $root.at(`${collection}.${itemId}`)
    },
    [itemId]
  )
  if (!ready || !itemId) return [undefined, undefined, ready]
  return [$root.get(`${collection}.${itemId}`), $item, ready]
}

export function useLocalDoc (collection, docId) {
  if (typeof collection !== 'string') {
    throw new Error(
      `[react-sharedb] useLocalDoc(): \`collection\` must be a String. Got: ${collection}`
    )
  }
  if (!docId) {
    console.warn(`
      [react-sharedb] useLocalDoc(): You are trying to subscribe to an undefined document id:
        ${collection}.${docId}
      Falling back to '__NULL__' document to prevent critical crash.
      You should prevent situations when the \`docId\` is undefined.
    `)
    docId = '__NULL__'
  }
  return useLocal(collection + '.' + docId)
}

export function useSession (path) {
  if (typeof path !== 'string') {
    throw new Error(
      `[react-sharedb] useSession(): \`path\` must be a String. Got: ${path}`
    )
  }
  return useLocal('_session' + '.' + path)
}

export function usePage (path) {
  if (typeof path !== 'string') {
    throw new Error(
      `[react-sharedb] usePage(): \`path\` must be a String. Got: ${path}`
    )
  }
  return useLocal('_page' + '.' + path)
}

export const ComponentMetaContext = React.createContext({})

export function useNow () {
  let { createdAt } = useContext(ComponentMetaContext)
  return createdAt
}

export function useComponentId () {
  let { componentId } = useContext(ComponentMetaContext)
  return componentId
}
