import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'

export default function MetaData({title}) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${title} - KProducts`}</title>
      </Helmet>
  </HelmetProvider>
  )
}
