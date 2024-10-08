import React from 'react'
import { createHashRouter, RouteObject } from 'react-router-dom'
import { getDefaultLayout } from './components/layout'

import InventoryPage from './pages/inventory'
import GPSComponent from './pages/geolocalisation'
import Tracking from './pages/tracking'


export const routerObjects: RouteObject[] = [
  {
    path: '/',
    Component: Tracking,
  },
]

export function createRouter(): ReturnType<typeof createHashRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: page,
      Component: null,
    }
  })
  return createHashRouter(routeWrappers)
}
